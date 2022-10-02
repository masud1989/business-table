const express = require('express')
const router = express.Router();
const { ProductList, deleteProduct } = require('../controllers/ProductsController');

router.get('/ProductList/:pageNo/:perPage/:searchKeyword', ProductList);
router.get('/deleteProduct/:id', deleteProduct);

module.exports = router;