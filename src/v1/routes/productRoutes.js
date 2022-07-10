const express = require("express");
const productController = require("../../controllers/productController");
const loginController = require("../../controllers/loginController");
const router = express.Router();

router.use(express.raw());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/:id?', productController.getProducts);
router.post("/", loginController.getIsAdmin, productController.createNewProduct);
router.delete('/:id', loginController.getIsAdmin, productController.deleteOneProduct);
router.put('/:id', loginController.getIsAdmin, productController.updateOneProduct);

module.exports = router;
