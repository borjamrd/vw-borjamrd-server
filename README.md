# testvwborjaserver

### fork del repositorio

Debes hacer fork de este repositorio

https://desarrolloweb.com/articulos/git-clone-clonar-repositorio.html#:~:text=Primero%20tienes%20que%20crear%20un,que%20t%C3%BA%20quieras%20con%20%C3%A9l.

### clonar el repositorio



Debes clonar el respositiorio en la carpeta desde la cual quieras levantar el servidor, por ejemplo: 
/Escritorio
Para ello
``
git clone git@github.com:borjamrd/testvwborjaclientserver.git
cd testvwborjaclientserver
``

### instalación dependencias

A continuación deberás instalar las dependencias del package.json. Para ello

`npm install`

Ahora puedes, o bien levantar el servidor con los datos que tiene por defecto data.json, o bien escrapear de nuevo la página de coches.
Para NO escrapear de nuevo
`
npm run start
`

Para escrapear de nuevo
``
node indexData.js
npm run start
``


Revisa que el contenido se muestra correctamente en 

http://localhost:3002/api/car


