require('dotenv/config');
const express = require('express');
const bodyParser = require("body-parser");
const productRouter = require("./v1/routes/productRoutes");
const cartRouter = require("./v1/routes/cartRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use(function(req, res) {
    res.status(404).send({ status: "NOT FOUND", data: {error: -2, description: `Ruta ${req.path} metodo ${req.method} no implementado`}});
});

app.listen(PORT, () => {
    console.log('Servidor iniciado.', PORT);
})
app.on("error", error => console.log(`Error en servidor ${error}`));