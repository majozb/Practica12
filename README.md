# Practica 11 - Aplicación Express para coleccionistas de cartas Magic

<p align="center">
  <a href="https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-majozb?branch=main">
    <img src="https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-majozb/badge.svg?branch=main">
  </a>
  <a href="https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-majozb/actions/workflows/node.js.yml">
    <img src="https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-majozb/actions/workflows/node.js.yml/badge.svg">
  </a>
  <a href="https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-majozb">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2324_ull-esit-inf-dsi-23-24-prct11-http-express-magic-app-majozb&metric=alert_status">
  </a>
</p>

- Nombres y apellidos: Mariajose Zuloeta Brito
- alu0101516608
- Grupo: PE102

## Introducción
Esta práctica tiene como objetivo principal el desarrollo de un servidor HTTP utilizando Node.js y Express para gestionar una colección de cartas del juego de cartas Magic. A través de este ejercicio, los participantes explorarán la creación de rutas HTTP para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las cartas, así como la persistencia de datos utilizando archivos JSON en el sistema de archivos del servidor. Además, se enfocará en la validación de datos de entrada, el manejo de errores y la documentación del código para garantizar la funcionalidad y la claridad del proyecto. Este ejercicio proporcionará una base sólida en el desarrollo de aplicaciones web utilizando tecnologías modernas.

## Objetivos
- Aprender a usar request y response en Express.
- Aprender a mplementar de un servidor Express.
- Aprender a manejar errores en Express.
- Entender el concepto de promesas.

## Desarrollo
### Aplicación para coleccionistas de cartas Magic
Gracias a la práctica anterior, ya teníamos una aplicación que permitía a los usuarios gestionar una colección de cartas del juego de cartas Magic, pero funcionaba de forma asíncrona con un servidor creado por nosotros mismos. En esta práctica, hemos mejorado la aplicación para que funcione de forma con Express.

Luego, planificamos cómo manejar las solicitudes del cliente utilizando Express. Definimos las rutas y los métodos HTTP que manejarían las operaciones CRUD (crear, leer, actualizar y eliminar) para las cartas. Por ejemplo, configuramos la ruta "/cards" para que aceptara solicitudes GET, POST, DELETE y PATCH, y definimos cómo cada solicitud sería manejada en el servidor.

Para garantizar la persistencia de los datos, implementamos la lógica para guardar y recuperar la colección de cartas de cada usuario en el sistema de archivos del servidor. Utilizamos archivos JSON para almacenar la información de cada carta, organizados en directorios con el nombre de cada usuario.

Además, para mejorar la experiencia del usuario, todos los mensajes de respuesta del servidor al cliente fueron formateados en JSON. Esto incluyó mensajes de éxito o error para cada operación realizada en la colección de cartas.

Para probar la aplicación, utilizamos herramientas como ThunderClient o Postman para enviar solicitudes HTTP al servidor y verificar que las operaciones se realizaran correctamente. También implementamos pruebas unitarias utilizando metodologías de desarrollo dirigido por pruebas para garantizar el correcto funcionamiento del código y su robustez ante entradas no válidas o inesperadas.

A nivel de automatización de pruebas con Sonar Cloud, Coveralls y GitHub Actions, fue necesario iniciar el servidor antes de ejecutar las pruebas, por lo que se creó un script en el archivo package.json para iniciar el servidor antes de ejecutar las pruebas, para ello se utilizó el comando `npm run start` en el archivo package.json. Para que todo funcionará correctamente primero teniamos que compilar, de forma que se crearía el directorio dist con el código compilado y luego ejecutar el servidor, esto fue muy confuso al principio, pero al final se logró. Y para finalizar, tambien teniamos que parar el servidor, para ello se uso el comando `kill $(lsof -t -i:3000) || true` que lo que hace es parar el servidor que se está ejecutando en el puerto 3000.

Fue una práctica muy interesante, ya que se pudo ver cómo se puede mejorar una aplicación que ya estaba creada y funcionando, y se pudo ver cómo se puede implementar un servidor HTTP utilizando Node.js y Express para gestionar una colección de cartas del juego Magic.

### Modificación 
Se nos pidió que eligieramos dos funcionalidades de las propuestas en el enunciado de la práctica anterior y las implementaramos con promesas. Las funcionalidades que he elegido son las siguientes:
- **Añadir una carta a la colección**: Se añade una carta a la colección de cartas. Si la carta ya existe, se notifica con un error al usuario. Si no existe, se añade a la colección.
- **Eliminar una carta de la colección**: Se elimina una carta de la colección de cartas. Si la carta no existe, se notifica con un error al usuario. Si existe, se elimina de la colección.  

Esto simplemente, fue pasar el código implementado anteriormente de estas funciones y usar la estructura de las promesas, esto fue muy sencillo y en realidad es más cómodo trabajar con promesas ya que es más visible cuando estás mandando un error y cuando se envía una respuesta correcta gracias al reject y el resolve.

## Conclusión
En esta práctica hemos aprendido a implementar un servidor HTTP utilizando Node.js y Express para gestionar una colección de cartas del juego Magic: The Gathering. A través de este ejercicio, hemos explorado la creación de rutas HTTP para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las cartas, así como la persistencia de datos utilizando archivos JSON en el sistema de archivos del servidor. Además, nos hemos enfocado en la validación de datos de entrada, el manejo de errores y la documentación del código para garantizar la funcionalidad y la claridad del proyecto. Este ejercicio nos ha proporcionado una base sólida en el desarrollo de aplicaciones web utilizando tecnologías modernas.
 
## Referencias 
- [Enunciado de la práctica](https://ull-esit-inf-dsi-2324.github.io/prct11-http-express-magic-app/)
- [Enlace de interés para yargs](https://github.com/yargs/yargs/blob/main/docs/advanced.md)
- [Enlace Yargs](https://www.npmjs.com/package/yargs)
- [Enlace fs](https://nodejs.org/docs/latest/api/fs.html)
- [Enlace Chai](https://www.chaijs.com/)
