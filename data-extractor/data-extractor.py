import requests
import psycopg2
from psycopg2 import OperationalError
import pandas as pd
from dotenv import load_dotenv
import os
import time

def load_environment_variables():
    load_dotenv()
    return {
        'host': os.getenv('DB_HOST'),
        'database': os.getenv('DB_NAME'),
        'username': os.getenv('DB_USER'),
        'password': os.getenv('DB_PASS'),
        'api_url': os.getenv('API_URL'),
        'time_to_wait_for_api': os.getenv('TIME_TO_WAIT_FOR_API')
    }

def connect_to_postgresql(host, database, username, password, query):
    try:
        connection = psycopg2.connect(
            host=host,
            database=database,
            user=username,
            password=password
        )
        print("Connected to PostgreSQL database")
        
        df = pd.read_sql_query(query, connection)
        return df
    except OperationalError as e:
        print(f"Error: {e}")
        return None
    finally:
        if connection:
            connection.close()
            print("PostgreSQL connection is closed")

def create_or_get_resource(url, endpoint, data, key):
    response = requests.post(f"{url}/{endpoint}", json=data)
    if response.status_code == 409:
        resource_response = requests.get(f"{url}/{endpoint}/{data[key]}")
        if resource_response.status_code == 200:
            return resource_response.json()
        else:
            raise Exception(f"Error retrieving existing {endpoint}: {resource_response.text}")
    return response.json()

def create_or_update_debtor(url, data, key):
    response = requests.post(f"{url}/debtors", json=data)
    if response.status_code == 409:
        patch_data = {
            'totalPayments': str(data['totalPayments'])
        }
        patch_response = requests.patch(f"{url}/debtors/{data[key]}", json=patch_data)
        if patch_response.status_code == 200:
            return patch_response.json()
        else:
            raise Exception(f"Error updating existing debtor: {patch_response.text}")
    elif response.status_code == 201:
        return response.json()
    else:
        raise Exception(f"Error creating debtor: {response.text}")

def process_row(url, row):
    client_data = {
        'name': row['cliente']
    }
    debtor_data = {
        'rut': str(row['rut']),
        'totalPayments': str(row['abonos'] + row['monto']),
    }
    manager_data = {
        'name': row['gestor']
    }

    clients_response = create_or_get_resource(url, 'clients', client_data, 'name')
    debtor_response = create_or_update_debtor(url, debtor_data, 'rut')
    manager_response = create_or_get_resource(url, 'managers', manager_data, 'name')

    payment_data = {
        'clientId': clients_response['clientId'],
        'debtorId': debtor_response['debtorId'],
        'managerId': manager_response['managerId'],
        'amount': str(row['monto']),
        'paymentDate': str(row['f_pago']),
    }

    payment_response = requests.post(f"{url}/payments", json=payment_data)
    print(f"Payment created: {payment_response.json()}")

def check_data_existence(url):
    response = requests.get(f"{url}/hasData")
    return response.json()

def main():
    query = "SELECT * FROM tabla_cubo"

    df = connect_to_postgresql(env_vars['host'], env_vars['database'], env_vars['username'], env_vars['password'], query)

    if df is not None:
        url = env_vars['api_url']
        
        if check_data_existence(url):
            print("Los datos ya están poblados.")
            return
        
        for index, row in df.iterrows():
            try:
                process_row(url, row)
            except Exception as e:
                print(f"Error processing row {index}: {e}")

if __name__ == "__main__":
    env_vars = load_environment_variables()
    time.sleep(int(env_vars['time_to_wait_for_api']))
    main()
