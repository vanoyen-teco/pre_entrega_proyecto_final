require('dotenv/config');
let dataBaseType = process.env.DB || 'MongoDb';
// Verifico contenido de variable de entorno DB

dataBaseType = (dataBaseType == 'MongoDb' || dataBaseType == 'Firebase')?dataBaseType:'MongoDb';
const db = require(`./daos/product${dataBaseType}`);


const getAllProducts = () => {
    return db.get();
};

const getProductById = (productId) => {
    return db.getById(productId);
};

const createNewProduct = (newProduct) => {
    const res = db.add(newProduct);
    return (res)?newProduct:false;
};

const deleteOneProduct = (productId) => {
    try {
        return db.remove(productId);
    } catch (error) {
        return false;
    }  
};

const updateOneProduct = (productId, changes) => {
    try {
        db.update(productId, changes);
        const updatedProduct = {
            ...changes,
            id: productId
        }
        return updatedProduct;
    } catch (error) {
        return false;
    }    
};

module.exports = { 
    getAllProducts,
    getProductById,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct,
};