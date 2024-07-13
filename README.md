
  

# Assets Backend (NESTJS)

  

  

Este proyecto consta de una aplicación web desarrollada con NextJS y su correspondiente backend.

  
  

### Configuración del entorno

  

  

1. Crea un directorio `env/` en la raíz del proyecto backend.

  

  

2. Dentro del directorio `env/`, crea los siguientes archivos con sus respectivas variables de entorno:

  

  

a. `assets-api.env`:

  

DB_HOST=

DB_NAME=

DB_USER=

DB_PASS=

DB_PORT=5432

PORT=3000

  
  

b. `data-extractor.env`, en este archivo van las credenciales de la bdd externa de donde se extraen los datos:

  

DB_HOST=

DB_NAME=

DB_USER=

DB_PASS=

API_URL=http://assets-api:3000

TIME_TO_WAIT_FOR_API=10

TIME_TO_WAIT_FOR_API es una variable para que el servicio data-extractor espere a que se termine de levantar la API principal, en caso de tener problemas subir este número.

  

c. `db-assets.env`:

  

POSTGRES_USER=

POSTGRES_PASSWORD=

POSTGRES_DB=

POSTGRES_PORT=5432

Estas variables deben ser las mismas especificadas en `assets-api.env`.

  
  

### Ejecución del backend

  

  

Una vez que hayas configurado los archivos de entorno, sigue estos pasos para ejecutar el backend:

  

  

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

  

  

2. Desde la raíz del proyecto backend, ejecuta el siguiente comando para iniciar los servicios:

  

docker-compose --file=docker-compose.dev.yml up --build

  
  

Este comando iniciará todos los servicios necesarios para el backend, incluyendo la base de datos, la API y el servicio data-extractor.

  

  

3. Espera a que todos los servicios se inicien correctamente. Deberías ver logs indicando que los servicios están listos.

  

  

4. Una vez que todos los servicios estén en funcionamiento, el backend estará disponible en `http://localhost:3000`.

5. Se puede acceder a la documentación de los endpoints en `http://localhost:3000/api-docs`

  

  

### Notas adicionales

  

  

- Asegúrate de que el puerto 3000 esté libre en tu sistema antes de iniciar los servicios del backend.

  

- Si necesitas detener los servicios, puedes usar `Ctrl+C` en la terminal donde ejecutaste `docker-compose --file=docker-compose.dev.yml up`, o ejecutar `docker-compose --file=docker-compose.dev.yml down` desde otra terminal en el mismo directorio.

  

- Para acceder a los logs de un servicio específico, puedes usar `docker-compose logs --file=docker-compose.dev.yml [nombre-del-servicio]`.

  

  

## Supuestos

  

- Se agregó el modelo Debtor(Deudor) para así guardar el rut y el total de abonos realizados en una entidad independiente

  

- Por cada fila de la tabla_cubo, se asume que abonos es el la suma de los pagos realizados hasta la fecha sin considerar el que se está registrando, esto debido a que hay registros donde el total de abonos es menor que el monto del pago.

  

- Se asume que el total de abonos realizados es del deudor y por eso se guarda en la entidad Debtor como atributo `totalPayments` y se actualiza por cada fila como la suma de pago y abono.