const Product = require("../database/Product");

const getAllProducts = () => {
    const allProducts = Product.getAllProducts();
    return allProducts;
};

const getProductById = (productId) => {
    const getProduct = Product.getProductById(productId);
    return getProduct;
};

const createNewProduct = (newProduct) => {
    const lastId = Product.getLastId() ;
    const productToInsert = {
        ...newProduct,
        id: lastId,
        timestamp: new Date().getTime(),
    };
    try {
        if(lastId){
            const createdProduct = Product.createNewProduct(productToInsert);
            return createdProduct;
        }
    } catch (error) {
        return false;
    }
};

const updateOneProduct = (productId, changes) => {
    try {
        const updatedProduct = Product.updateOneProduct(productId, changes);
        return updatedProduct;
    } catch (error) {
        return false;
    }
};

const deleteOneProduct = (productId) => {
    const deletedProduct = Product.deleteOneProduct(productId);
    return deletedProduct;
};

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct,
};