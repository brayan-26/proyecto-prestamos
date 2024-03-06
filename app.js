import express from "express";
import morgan from "morgan";
import { connection } from "./config/db.js";
import router from "./router/router.js";

const app = express();
// controlamos los get and post
app.use(morgan("dev"));

// escuchamos un puerto
app.listen(3000, (req, res) => {
  console.log("Port on 3000");
});

// creamos la conexion a la base de datos
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// usamos las rutas
app.use("/api", router);
