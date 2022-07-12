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
    try {
        const createdProduct = Product.createNewProduct(newProduct);
        return createdProduct;
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