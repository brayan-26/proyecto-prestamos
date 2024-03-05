const express = require("express");
const bodyParser = require("body-parser");
const {connection} = require("./config/db");

app = express();
const port = 3000;

app.listen(port, (req, res) => {
  console.log("PORT ON");
});

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// ruta principal
app.get("/", (req, res) => {
  let mensaje = "";
  res.render("index", { mensaje });
});

// ruta del login index.js
app.post("/login-admin", (req, res) => {
  // tomamos los datos del formulario
  const usuario = req.body.usuario;
  const contraseña = req.body.contrasena;

  //   validamos los campos no vacios
  if (usuario && contraseña) {
    // validamos el user
    if (usuario === "brayan" && contraseña === "12345") {
      res.render("register-user");
    } else {
      mensaje = "Datos invalidos";
      res.render("index", { mensaje });
    }
  } else {
    mensaje = "Ingrese todos los datos";
    res.render("index", { mensaje });
  }
});

// ruta del login register-user.js
app.post("/register-user", (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;

  //   validamos los campos no vacios
  if (nombre && apellido && email) {
    console.log("melo");
  } else {
    mensaje = "Ingrese todos los datos";
    res.render("register-user");
  }
});
