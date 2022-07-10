const express = require("express");
const cartController = require("../../controllers/cartController");
const router = express.Router();

router.use(express.raw());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post("/", cartController.createNewCart);
router.delete('/:id', cartController.deleteOneCart);
router.get('/:id/productos', cartController.getAllFromOneCart);
router.post('/:id/productos', cartController.insertNewProduct);
router.delete('/:id/productos/:id_prod', cartController.deleteProductFromCart);

module.exports = router;