const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const conecctiondb = require("./contexts/appContext");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); //El paquete raro, xd

const puerto = 8080;
const app = express();

// Configuración del motor de vistas
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Rutas
const homeController = require("./routers/homeRouter");
const errorController = require("./controllers/404Controller");
const autoresController = require("./routers/autorRouter");
const categoriasController = require("./routers/categoriaRouter");
const editoresController = require("./routers/editorialesRouter");
const librosController = require("./routers/libroRouter");
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-portada-libro-${file.size}`);
  },
});

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(homeController);
app.use(autoresController);
app.use(categoriasController);
app.use(editoresController);
app.use(librosController);
app.use(errorController.get404);
//! Analiza el req y verifica que si llega una propiedad img, trabaala (guardarla)
//url : dice url porque me dio pereza cambiarlo, xd
app.use(
  multer({
    storage: imageStorage,
  }).single("imgPath")
); //! Multer

//Modles
const autoresModel = require("./models/autores");
const categoriaModel = require("./models/categoria");
const editorialesModel = require("./models/editoriales");
const librosModel = require("./models/libros");

//Esto sincroniza los modelos de la bd
// ({alter: true}) este no borra la data guardada
// ({force: true}) este borra la data guardada

conecctiondb
  .sync({})
  .then((items) => {
    app.listen(puerto);
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
