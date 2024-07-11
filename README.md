# assets-backend

## Supuestos
- Se agregó el modelo Debtor(Deudor) para así guardar el rut y el total de abonos realizados en una entidad independiente
- Por cada fila de la tabla_cubo, se asume que abonos es el la suma de los pagos realizados hasta la fecha sin considerar el que se está registrando, esto debido a que hay registros donde el total de abonos es menor que el monto del pago.
- Se asume que el total de abonos realizados es del deudor y por eso se guarda en la entidad Debtor