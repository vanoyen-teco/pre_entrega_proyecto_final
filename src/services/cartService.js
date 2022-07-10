const Cart = require("../database/Cart");

const createNewCart = () => {
    const lastId = Cart.getLastId() ;
    const CartToInsert = {
        id: lastId,
        timestamp: new Date().getTime(),
    };
    try {
        if(lastId){
            const createdCart = Cart.createNewCart(CartToInsert);
            return createdCart;
        }
    } catch (error) {
        return false;
    }
};

const deleteOneCart = (cartId) => {
    const deletedCart = Cart.deleteOneCart(cartId);
    return deletedCart;
};

const getCartById = (cartId) => {
    const getCart = Cart.getCartById(cartId);
    return (getCart.productos == undefined)?false:getCart.productos;
};

const insertNewProduct = (cartId, newProduct) => {
    try {
        const insertedProduct = Cart.insertNewProduct(cartId, newProduct);
        return insertedProduct;
    } catch (error) {
        return false;
    }
};

const deleteProductFromCart = (cartId, prodId) => {
    try {
        return (Cart.getCartById(cartId))?Cart.deleteOneProduct(cartId, prodId):false;
    } catch (error) {
        return false;
    }
};

module.exports = {
    createNewCart,
    insertNewProduct,
    getCartById,
    deleteOneCart,
    deleteProductFromCart,
};