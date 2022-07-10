const cartService = require("../services/cartService");

const createNewCart = (req, res) => {
    const createdCart = cartService.createNewCart();
    (createdCart)
    ?res.status(201).send({ status: "OK", data: createdCart })
    :res.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos crear el carrito."} });
};

const insertNewProduct = (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    if (
        !body.id ||
        !body.timestamp ||
        !body.nombre ||
        !body.descripcion ||
        !body.codigo ||
        !body.foto ||
        !body.precio ||
        !body.stock ||
        !id
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const newProduct = {
        id: body.id,
        timestamp: body.timestamp,
        nombre: body.nombre,
        descripcion: body.descripcion,
        codigo: body.codigo,
        foto: body.foto,
        precio: body.precio,
        stock: body.stock,
    };
    const insertedProduct = cartService.insertNewProduct(id, newProduct);
    (insertedProduct)
    ?res.status(201).send({ status: "OK", data: insertedProduct })
    :res.status(204).send({ status: "No Content" });
    
};

const deleteOneCart = (req, res) => {
    if(!req.params.id){
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const deletedCart = cartService.deleteOneCart(req.params.id);
    return (deletedCart)
    ?res.status(200).send({ status: "OK", data: deletedCart })
    :res.status(404).send({ status: "NOT FOUND", data: {error: "Lo sentimos, no encontramos el carrito."} })
};

const getAllFromOneCart = (req, res) => {
    if(!req.params.id){
        res.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos recuperar el carrito."} });
    }else{
        const cartProducts = cartService.getCartById(req.params.id);
        return (cartProducts)
        ?res.status(200).send({ status: "OK", data: cartProducts })
        :res.status(204).send({ status: "NO CONTENT" })
    }
};

const deleteProductFromCart = (req, res) => {
    if(!req.params.id || !req.params.id_prod){
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const deletedProduct = cartService.deleteProductFromCart(req.params.id, req.params.id_prod);
    return (deletedProduct)
    ?res.status(204).send({ status: "No content" })
    :res.status(404).send({ status: "NOT FOUND", data: {error: "No podemos eliminar el producto"} })
};

module.exports = {
    createNewCart,
    getAllFromOneCart,
    insertNewProduct,
    deleteOneCart,
    deleteProductFromCart,
};