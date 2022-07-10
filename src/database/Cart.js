const DB = require("./carritos.json");
const { saveCartToDatabase } = require("./tools");

const getAllCarts = () => {
    return DB.carts;
};

const getCartById = (cartId) => {
    const id = parseInt(cartId);
    const element = getAllCarts().filter((item) => (item.id == id));
    return (element.length < 1)?false:element;
};

const getLastId = () => {
    try {
        const allIds = getAllCarts();
        if(allIds.length > 0){
            let ids = allIds.map(function(item) {
                return item.id;
            });
            id = Math.max(...ids) + 1;
        }else{
            id = 1;
        }
        return id;
    } catch (error) {
        return false;
    }
}

const createNewCart = (CartToInsert) => {
    DB.carts.push(CartToInsert);
    saveCartToDatabase(DB);
    return CartToInsert;
};

const insertNewProduct = (cartId, newProduct) => {
    const indexForCart = DB.carts.findIndex(
        (cart) => cart.id === parseInt(cartId)
    );
    if (indexForCart === -1) {
        return false;
    }
    
    if(DB.carts[indexForCart].productos != undefined){
        const isAlreadyAdded =
            DB.carts[indexForCart].productos.findIndex((product) => product.id === newProduct.id) > -1;
        if (isAlreadyAdded) {
            return false;
        }else{
            DB.carts[indexForCart].productos.push(newProduct);
        }
    }else{
        DB.carts[indexForCart].productos = [newProduct];
    }
    saveCartToDatabase(DB);
    return newProduct;
};

const deleteOneCart = (cartId) => {
    const indexForDeletion = DB.carts.findIndex(
        (cart) => cart.id === parseInt(cartId)
    );
    if (indexForDeletion === -1) {
        return false;
    }
    try {
        DB.carts.splice(indexForDeletion, 1);
        saveCartToDatabase(DB);
        return cartId;
    } catch (error) {
        return false;
    }  
};

const deleteOneProduct = (cartId, prodId) => {
    console.log(prodId);
    const cartIndex = DB.carts.findIndex(
        (cart) => cart.id === parseInt(cartId)
    )
    const productIndex =
        DB.carts[cartIndex].productos.findIndex(
            (product) => product.id === parseInt(prodId)
        );
    if (productIndex === -1) {
        return false;
    }else{
        DB.carts[cartIndex].productos.splice(productIndex, 1);
        saveCartToDatabase(DB);
        return true;
    }
};


module.exports = { 
    getAllCarts,
    createNewCart,
    insertNewProduct,
    getLastId,
    getCartById,
    deleteOneCart,
    deleteOneProduct,
};