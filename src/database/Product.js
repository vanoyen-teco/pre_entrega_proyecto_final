const DB = require("./productos.json");
const { saveProuctToDatabase } = require("./tools");

const getAllProducts = () => {
  return DB.products;
};

const getProductById = (productId) => {
    const id = parseInt(productId);
    const element = getAllProducts().filter((item) => (item.id == id));
    return (element.length < 1)?false:element;
};

const createNewProduct = (newProduct) => {
    const isAlreadyAdded =
        DB.products.findIndex((product) => product.name === newProduct.name) > -1;
    if (isAlreadyAdded) {
        return;
    }
    DB.products.push(newProduct);
    saveProuctToDatabase(DB);
    return newProduct;
};

const getLastId = () => {
    try {
        const allIds = getAllProducts();
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
const deleteOneProduct = (productId) => {
    const indexForDeletion = DB.products.findIndex(
        (product) => product.id === parseInt(productId)
    );
    if (indexForDeletion === -1) {
        return false;
    }
    try {
        DB.products.splice(indexForDeletion, 1);
        saveProuctToDatabase(DB);
        return productId;
    } catch (error) {
        return false;
    }  
};

const updateOneProduct = (productId, changes) => {
    const indexForUpdate = DB.products.findIndex(
        (product) => product.id === parseInt(productId)
    );
    if (indexForUpdate === -1) {
        return false;
    }
    const updatedProduct = {
        ...DB.products[indexForUpdate],
        ...changes
    };
    DB.products[indexForUpdate] = updatedProduct;
    saveProuctToDatabase(DB);
    return updatedProduct;
};

module.exports = { 
    getAllProducts,
    getProductById,
    createNewProduct,
    updateOneProduct,
    getLastId,
    deleteOneProduct,
};