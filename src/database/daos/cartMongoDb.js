const mongoose = require('mongoose');

const { mongoDbConfig } = require("./config");
const url = mongoDbConfig.connectString;

mongoose.connect(url)
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})

mongoose.connection;

const Schema = mongoose.Schema;
const CartModelSchema = new Schema({
    productos: [],
    timestamp: { type: Number },
    id: String
});
const CartModel = mongoose.model('carritos', CartModelSchema );

async function get(){
    const querySnapshot = await CartModel.find();
    return querySnapshot;
}

async function getById(cartId){
    const cart = await CartModel.findOne({id: cartId});
    return (cart == null)?false:cart;
}

async function add(newCart){
    let id;
    CartModel.create({ timestamp: newCart.timestamp }, function (err, cart) {
        if (err) return handleError(err);
        id = cart._id;
    })

    const doc = await CartModel.findOne({ id });
    let updateCart = {...newCart};
    updateCart.id = id;
    doc.overwrite(updateCart);
    const data = await doc.save();

    return data;
}

async function update(cartId, changes){
    await CartModel.updateOne({ _id: cartId }, {
        productos: changes
    });
    const doc = await CartModel.findOne();
    return doc;
}

async function remove(cartId){
    const res = await CartModel.deleteOne({ id: cartId });
    return res;
}

module.exports = {
    get,
    getById,
    add,
    update,
    remove,
};