# Video Chat
Este proyecto es una aplicación de video chat que permite a los usuarios compartir pantalla, activar la cámara, aplicar filtros y escribir mensajes. La aplicación está construida con React en el frontend y Node.js en el backend.

## Características
* **Video chat**: Comunicación en tiempo real con video y audio.
* **Compartir pantalla**: Permite a los usuarios compartir su pantalla.
* **Filtros de video**: Aplicación de varios filtros al video en tiempo real.
* **Mensajería**: Envío y recepción de mensajes de texto durante la llamada.

## Requisitos
- Node.js v14 o superior
- npm v6 o superior

## Instalación
1. Clonar el repositorio

```
git clone https://github.com/polanmarc/React_VideoChat.git
```
```
cd React_VideoChat
```
2. Instalar dependencias
Instalar dependencias tanto en el frontend como en el backend.
```
cd chat
npm install
cd ../server
npm install
```
## Ejecución
1. Iniciar el servidor
Navega al directorio server y ejecuta el siguiente comando:
```
node server.js
```

2. Iniciar el cliente
Navega al directorio client y ejecuta el siguiente comando:
```
npm run dev
```
El cliente se iniciará en http://localhost:5173/.

## Estructura del Proyecto
- **server**: Contiene todo lo necesario para que el servidor node funcione:
  - **server.js**: Archivo principal del servidor que contiene toda la lógica de backend para la aplicación..
  - **node_modules**: Contiene las dependencias de npm para el backend.
- **chat**: Contiene todo necesario para que el frontend funicone:
  - **src/components**: Contiene los componentes React utilizados en la aplicación.
  - **src/css**: Contiene los componentes todas las paginas de estilos para la aplicacion.
  - **node_modules**: Contiene las dependencias de npm para el frontend.

## Contacto
Para cualquier duda o sugerencia, por favor contacta a polanmarc19@gmail.com.

---

¡Gracias por utilizar nuestra aplicación de video chat!
