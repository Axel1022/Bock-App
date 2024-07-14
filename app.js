const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");

const puerto = 1010;
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

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
const homeController = require("./routers/homeRouter");
const errorController = require("./controllers/404Controller");
const autoresController = require("./routers/autorRouter");
const categoriasController = require("./routers/categoriaRouter");
app.use(homeController);
app.use(autoresController);
app.use(categoriasController);
app.use(errorController.get404);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
