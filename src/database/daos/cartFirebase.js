const { firebaseConfig } = require("./config");
const path = require('path');
const admin = require("firebase-admin");

const serviceAccount = require(path.join('../../../keys/' , firebaseConfig.jsonKey));

try {
    admin.app();
} catch  {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const query = db.collection('carritos');

async function get(){
    const translations = [];
    const querySnapshot = await query.get();
    querySnapshot.forEach(doc => {
        translations.push(doc.data());
    });
    return translations;
}

async function getById(cartId){
    const cartRef = query.doc(cartId);
    const doc = async () => {
        const res = await cartRef.get();
        const docData = res.data();
        return docData;
    }
    return  doc().then(res => res);
}

async function add(newCart){
    const ref = await query.doc();
    newCart.id = ref.id;
    newCart = {...newCart};
    const data = await ref.set(newCart).then(() => { return newCart});
    return data;
}

async function update(cartId, changes){
    try {
        const cartRef = query.doc(cartId);
        const res = await cartRef.update({productos: changes}).then(() => { return changes});
        return res;
    } catch (error) {
        return false;
    }
    
}

async function remove(cartId){
    const res = await query.doc(cartId).delete();
    return res;
}

module.exports = {
    get,
    getById,
    add,
    update,
    remove,
};