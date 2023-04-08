const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers')


router.route('/')
.get(productController.getProduct) 
.post(productController.createProduct)

router.route('/:id').patch(productController.updateProduct)


module.exports = router;