const app = require('express');
const router = app.Router();
const {
	getProducts,
	getSingleProduct,
	newProduct,
	editProduct,
	deleteProduct,
} = require('../models/products.js');

router.get('/api/products', getProducts);
router.get('/api/products/:id', getSingleProduct);
router.post('/api/products', newProduct);
router.put('/api/products/:id', editProduct);
router.delete('/api/products/:id', deleteProduct);

module.exports = router;
