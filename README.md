# Practica profesional - Primer cuatrimestre 2019 - Restaurante - Equipo 5

<img src="https://vignette.wikia.nocookie.net/vrchat-legends/images/f/ff/Teem_five.jpg/revision/latest?cb=20180527122115" width="400" />

## Contenidos

1. [Responsabilidades](#responsabilidades)

## <a name="responsabilidades"></a><b>Responsabilidades</b>

## ==========================================

### **Nicolas Saavedra (NicolasSaavedraBranch)**

  #### Alta de productos (platos y bebidas) (25/05/2019 - 26/05/2019)
  
  - Se carga el nombre, la descripción, tiempo promedio de elaboración y el precio.
  - Con 3 fotos tomadas del celular.
  - Lector de código QR relacionado con los productos.
  - Esta acción la podrá realizar el cocinero o el bar tender.

  #### Qr de ingreso al local (26/05/2019 - 04/06/2019)
  
  - Para ponerse en la lista de espera (Leo QR y me agrego a la lista de espera)
  - Para acceder a la encuesta de antiguos usuarios. (Supervisor)
  
  #### Encuestas - Supervisor (04/06/2019 - 05/06/2019)
  
  - Puede seleccionar un empleado o un cliente para cargar un formulario con datos referentes al mismo.
  - Con mínimo un tipo de cada uno de estos controles (range, input, radio, check, select).
  - Mostrar los gráficos de las estadísticas obtenidas de cada uno de los ítems de ese empleado / cliente según corresponda.
  
  #### Gestión - Pedir platos y bebidas (15/06/2019 - 16/06/2019)
  
  - Se selecciona el plato / bebida y su cantidad.
  - Se pueden seleccionar desde un código Qr e indicar la cantidad.
  
  #### Delivery - Realizar pedido con GPS o dirección. (16/06/2019 - 20/06/2019)
  
  - Se podrá realizar pedidos de productos (solo usuarios registrados)
  - Se podrá ingresar una dirección de entrega o se podrá tomar las coordenadas de GPS para saber dónde entregar el pedido, (al cargar una dirección, igualmente en nuestro sistema queda registrada la posición del GPS).
  - Se debe agregar el tiempo de demora del plato más la demora en el traslado, tomada por la distancia entre le local y la dirección de entrega.
  - Los pedidos los confirman el dueño o el supervisor.
  
  #### Juegos - Juego 10% de descuento (05/06/2019 - 20/06/2019)
  
  - En caso de ganar se le descontará de la cuenta final el porcentaje correspondiente.
  
  #### Requerimientos basicos
  
  - Splash animado con ícono de la aplicación y el nombre de los alumnos.
  - Todo error o información mostrarlo con distintas ventanas. (DISTINTAS, ¡NO alerts!).
  - Sonidos distintos al iniciar y cerrar la aplicación.
  - Spinners, con el logo de la empresa, en todas las esperas. (TODAS).
  - Vibraciones al detectarse un error. (TODOS LOS ERRORES).
  - Distintos botones de usuario para testear el ingreso (flotantes, fijos, con distintas formas y distintas posiciones).
  - Generación de documentos (JSON / EXCEL).
  - Cargado de datos por medio de un archivo (JSON / EXCEL).
  - Gráficos estadísticos (torta, barra, etc.).

  #### Listado de funcionalidades mininas a ser evaluadas (PDF de git de fecha 08/06/2019)
  
  - Se le permite ver los productos y hacer el pedido para todos los comensales de la mesa.
  - Alta de un nuevo plato, lo ingresa el Chef (celular 2).
  - Se verifica la existencia en la carta por parte de un cliente (celular 1).
  - Alta de nueva bebida, la ingresa el Bar tender(celular 3). 
  - Se verifica la existencia en la carta por parte de un cliente (celular 1).
  - Hacer pedido por delivery, solo la puede realizar un cliente registrado.
  
## ==========================================

### **Damian Vogel (DamianVogelBranch)**

  #### Login / Generacion de pages y perfiles de acceso (11/05 a 18/05)
  1) Switch de acceso para cada perfil.
  2) Adecuacion de perfiles en DB.
  3) Generacion de pages para perfiles.

  #### Alta de dueño / supervisor (TBD - TBD) (18/05 al 25/05)
  1) Se cargarán: nombre, apellido, DNI, CUIL, foto y perfil.
  2) La foto se tomará del celular.
  3) Brindar la posibilidad de contar con un lector de código QR para el DNI, que cargará la información disponible (sólo aplicable a aquellos documentos que lo posean).
  4) Esta acción la podrá realizar el supervisor o el dueño.

  #### Lectura de QR ### (01/06 al 08/06)

  1) Lectura de estado de mesa via QR.
  2) Para relacionar al cliente con una mesa.
  3) Para ver el estado del pedido.
  
  #### Firebase Function #### (01/06 al 08/06) 

  1) Investigacion y aplicacion de Firebase Functions
  2) Instalacion de dependencias.
  3) Desarrollo de obtencion de token de dispositivos en diferentes puntos de la aplicacion.
  4) Test de Push Notifications al dar de alta de usuarios.
  
  #### PUSH NOTIFICATIONS - LOG IN -SERVICIOS MESA - PERSISTENCIA PEDIDOS TEST - COMPONENTES LISTA PEDIDOS \ PRODUCTOS -###(09/06 al 15/06)
  
  1) Desarrollo de funciones en Firebase para Push Notification:
        * HTTPS - Solicitud de mesa: 
          Aviso a Mozo y Supervisores.
        * onCreate - Alta de pedido: 
          Aviso a empleados del evento.
  
  2) Adecuacion de acceso al sistema como cliente anonimo.
      * Persistencia del usuario anonimo con id en coleccion de documentos.
      * Agregado de spinner y deshabilitacion de botones en request.

  3) En formulario de registro validacion de que email no exista para un usuario registrado.

  3) Servicio Mesa:
      * Servicio de obtencion de usuario en mesa para consumir en alta de pedido.
      * Numero de mesa autoincremental de acuerdo a ultimo registro en base para nuevas altas.
      * Validacion de estado de mesa al asignar via QR. 
  
  4) Componentes Lista Pedido \ Producto:
      * Generacion de servicios para la obtencion de pedidos filtrados por estado.
      * Generacion Component Lista y Pedido para mostrar los productos de un pedido.
        Cada uno de estos cuenta con un boton de accion que cambia el estado del mismo para cumplimentar el flujo del sistema.

 
#### COMPONENTES LISTA PEDIDOS \ PRODUCTOS - JUEGO AHORCADO - DESCUENTO POR JUEGOS - CAMBIO DE ESTADO EN PEDIDO - TEST QA - PAGINAS CLIENTE ANONIMO Y REGISTRADO - PROPINA EN PEDIDO #### (15/06 al 22/06) 

  1) Componentes Lista Pedido \ Producto:
      * Filtro de acuerdo a tipo de producto para que sea tomado por cada responsable.

  2)  Descuento por Juegos:
      * Funcionalidad de persistencia de descuento si se juega y se gana en un pedido. Validando que puede jugar N veces pero solo gana una vez. Discriminando que tipo de descuento recibe en base al juego. 
  
  3)  Cambio de estado en pedidos:
      * Al completarse todos los productos de un pedido por los responsables el pedido se marcara automaticamente como "terminado para que el mozo pueda entregarlo a la mesa. 
  
  4)  Paginas Cliente Anonimo y Cliente Registrado:
      * Habilitacion y creacion de servicios para identificar si una mesa se encuentra ocupado por que usuario y en base a eso que opciones puede realizar, habilitando botones de acciones, etc.
  
  5)  Propina en pedido:
      * Persistencia de la propina en cada pedido en base al grado de satisfaccion.
  
  6)  TEST QA:
      * Test de todo el flujo de la aplicacion desde la generacion de un pedido por un usuario anonimo como por usuario registrado validando que acciones puede realizar y cuales de acuerdo a su perfil.

#### COMPONENTES LISTA PEDIDOS \ PRODUCTOS - CAMBIO DE ESTADO EN PEDIDO - ENCUESTA INGRESO EMPLEADO #### (22/06 al 29/06)

  1) Componentes Lista Pedido \ Producto:
      * Correccion al mostrar pedido y liberar mesas cuando el evento de pago se recibo por parte del mozo.

  2) Componente Productos en Cocinero y Bar Tendedr:
      * Muestra cantidad.
  
  3) Estado Cancelado:
      * Al recibir estado 'cancelado' por parte del mozo, desencadenara todos los eventos relacionados en la pagina cliente registrado y anonimo.

  4) Creacion de encuesta ingreso empleado:
      * Al ingresar cada empleado solicitara realizar la encuesta si ese dia no aun no fue realizado.

  5) Muestra grafico de ingreso de empleados en pagina dueño.








## ==========================================

### **Augusto Morelli (AugustoMorelli / AugustoBranch)**

  #### Alta de cliente (TBD - TBD)

- Formulario de registro de clientes.
- Validación de todos los campos del formulario (form vacío, correo, DNI)
- *Se pueden cargar los datos del cliente por medio del lector de cofigo QR con el dni del mismo.*
- Se toma la foto del cliente.
- El dueño acepta la solicitud de registro del cliente.
- Se le envía un correo al cliente con un link de validación del correo.
- Dicho link habilita al usuario del cliente.

#### Reservas agendadas:

- Formulario de solicitud de reservas.
- Se valida que dicho formulario no este vacío.
- Se valida que no se pueda tomar una reserva anterior a la fecha actual.
- Se valida que las que el sistema asigne automáticamente una mesa acorde a lo solicitado.
- Se valida que dicha mesa no esté reservada previamente.
- Se valida que que la mesa no se pueda reservar por un período de 30 min anteriores y posteriores.
- Se valida que no se pueda tomar por QR una mesa en una fecha reservada (desde 4 min anteriores).
- La reserva puede ser aceptada o rechazada por el dueño.
- *Se le envía un push notification al cliente que hizo la reserva con el la aceptación o cancelación de la misma*.

#### Flujo del mozo:

- *Se le envía un push notification al mozo cuando un nuevo cliente se agrega a la lista de espera*.
- Pagina principal del mozo con el listado de todas las mesas y el estado de las mismas.
- El mozo puede aceptar o rechazar los pedidos de los clientes, tanto en salón como en delivery.
- El mozo puede acceder a cada mesa en particular con el estado de todos los pedidos que hizo el cliente.
- El mozo retira los productos terminados por el resto de los empleados y los entrega al cliente.
- El mozo cobra al cliente cuando este solicita la cuenta (se tiene en cuenta el cálculo de la propina y los descuentos).
- Cuando el cliente pagó, el mozo libera la mesa (se desvincula al cliente con la mesa).

#### Chat de delivery y clientes:

-Se valida que el chat sólo este disponible para aquellos clientes que tienen pedidos "en camino".
-Sala de chat entre el delivery y los clientes.
-Se le agrega la fecha de los mensajes.
