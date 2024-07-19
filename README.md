# 📚 BookApp

BookApp es una aplicación web desarrollada utilizando Node.js con Express.js bajo el paradigma de MVC (Model-View-Controller). La aplicación permite gestionar libros, categorías, autores y editoriales, proporcionando una interfaz intuitiva para la visualización y mantenimiento de estos recursos.

## Requisitos

- **Node.js**
- **Express.js**
- **Sequelize** (ORM para la persistencia de datos)
- **Bootstrap** (para el diseño de la interfaz)
- **Nodemailer** (para el envío de correos electrónicos)
- **Multer** (para el manejo de archivos)

## Funcionalidades Generales

### 🏠 Home
En la pantalla principal se listan todos los libros creados en el sistema. De cada libro se muestra:
- 📖 La portada del libro
- 📝 El título del libro
- 📅 El año de publicación
- 📂 La categoría a la que pertenece
- 👤 El nombre del autor
- 🏢 El nombre de la editorial

Además, se pueden filtrar los libros por título o por categoría (puede filtrarse por más de una categoría a la vez). Al hacer clic sobre un libro, se accede a la pantalla de detalle del libro donde se muestra:
- 📖 La imagen de la portada del libro
- 📝 El título del libro
- 📅 El año de publicación
- 📂 La categoría del libro
- 👤 El nombre del autor
- 🏢 El nombre de la editorial
- 🌍 El país de la editorial
- 📞 El teléfono de la editorial

### 📋 Menú
La aplicación cuenta con un menú con las siguientes opciones:
- 📚 Mantenimiento de libros
- 🗂️ Mantenimiento de categorías
- 👨‍🏫 Mantenimiento de autores
- 🏢 Mantenimiento de editoriales

## 🛠️ Mantenimiento de Libros
En la sección de mantenimiento de libros, se puede:
- Listar todos los libros con detalles como el título, imagen de portada, año de publicación, categoría, autor y editorial.
- Editar ✏️ o eliminar 🗑️ un libro existente.
- Crear ➕ un nuevo libro con un formulario que incluye título, año de publicación, imagen de portada, categoría, autor y editorial.
  - Se validan todos los campos como requeridos.
  - Al crear un libro, se envía un correo 📧 al autor notificando sobre la publicación del libro.
- La edición de un libro muestra un formulario con los datos actuales del libro.
- Al eliminar un libro, se solicita confirmación antes de proceder con la eliminación.

## 🗂️ Mantenimiento de Categorías
En la sección de mantenimiento de categorías, se puede:
- Listar todas las categorías con detalles como el nombre, descripción y cantidad de libros asociados.
- Editar ✏️ o eliminar 🗑️ una categoría existente.
- Crear ➕ una nueva categoría con un formulario que incluye nombre y descripción.
  - Se validan todos los campos como requeridos.
- La edición de una categoría muestra un formulario con los datos actuales de la categoría.
- Al eliminar una categoría, se solicita confirmación antes de proceder con la eliminación.

## 👨‍🏫 Mantenimiento de Autores
En la sección de mantenimiento de autores, se puede:
- Listar todos los autores con detalles como el nombre y correo del autor, y la cantidad de libros asociados.
- Editar ✏️ o eliminar 🗑️ un autor existente.
- Crear ➕ un nuevo autor con un formulario que incluye nombre y correo.
  - Se validan todos los campos como requeridos.
- La edición de un autor muestra un formulario con los datos actuales del autor.
- Al eliminar un autor, se solicita confirmación antes de proceder con la eliminación.

## 🏢 Mantenimiento de Editoriales
En la sección de mantenimiento de editoriales, se puede:
- Listar todas las editoriales con detalles como el nombre, teléfono, país y cantidad de libros asociados.
- Editar ✏️ o eliminar 🗑️ una editorial existente.
- Crear ➕ una nueva editorial con un formulario que incluye nombre, teléfono y país.
  - Se validan todos los campos como requeridos.
- La edición de una editorial muestra un formulario con los datos actuales de la editorial.
- Al eliminar una editorial, se solicita confirmación antes de proceder con la eliminación.

## 📥 Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url_del_repositorio>
   ```

2. Instalar las dependencias:
   ```bash
   cd BookApp
   npm install
   ```

3. Configurar la base de datos en `config/config.json` añadiendo el correo y la contraseña:
   ```javascript

   module.exports = {
     database: "bockApp",
     username: "<tu_correo>", // Correo
     password: "<tu_contraseña>", // Contraseña
     params: {
       dialect: "sqlite",
       storage: path.join(__dirname, "../database", "bockApp-db.sqlite"),
       define: {
         underscored: true,
       },
       logging: false,
     },
   };
   ```

4. Iniciar la aplicación:
   ```bash
   npm start
   ```

5. Abrir el navegador y navegar a `http://localhost:8080`.

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework web para Node.js.
- **Sequelize**: ORM para la persistencia de datos.
- **Bootstrap**: Framework de diseño CSS.
- **Nodemailer**: Módulo para el envío de correos electrónicos.
- **Multer**: Middleware para el manejo de archivos.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, envía un pull request o abre un issue para discutir los cambios que deseas realizar.

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📧 Contacto

Para cualquier pregunta o comentario, puedes contactar al autor:

- **Nombre**: Gary Alexander Campusano Paredes
- **Correo**: [ingcampusano@outlook.com](mailto:ingcampusano@outlook.com)
- **LinkedIn**: [Linkedin](https://www.linkedin.com/in/gary-alexander-campusano-paredes-87a28724a/)
