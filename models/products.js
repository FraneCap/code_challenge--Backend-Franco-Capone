const { readFileSync, writeFileSync } = require('fs');

const getProducts = (req, res) => {
	const products = readFileSync('db/products.json');
	if (!products) {
		return res.send('No products found!').status(404).end();
	}
	return res.send(products).status(200);
};

const getSingleProduct = (req, res) => {
	const product = JSON.parse(readFileSync('db/products.json')).find(
		(dbProduct) => dbProduct.id === req.params.id
	);
	if (!product) {
		return res.send('Product not found!').status(404).end();
	}
	return res.send(product).status(200);
};

const newProduct = (req, res) => {
	const products = JSON.parse(readFileSync('db/products.json'));
	const product = req.body;
	products.push(product);
	writeFileSync('db/products.json', JSON.stringify(products));
	return res.send({ message: 'Product added!', product: product }).status(200);
};

const editProduct = (req, res) => {
	const products = JSON.parse(readFileSync('db/products.json'));
	const editedProduct = req.body;
	const index = products.findIndex(
		(dbProduct) => dbProduct.id === req.params.id
	);
	if (index !== -1) {
		products[index] = editedProduct;
		writeFileSync('db/products.json', JSON.stringify(products));
		return res
			.send({ message: 'Product edited!', product: products[index] })
			.status(200);
	}
	return res.send({ message: 'Error editing product!' }).status(404).end();
};

const deleteProduct = (req, res) => {
	const products = JSON.parse(readFileSync('db/products.json'));
	const index = products.findIndex((product) => product.id === req.params.id);
	if (index !== -1) {
		products.splice(index, 1);
		writeFileSync('db/products.json', JSON.stringify(products));
		return res.send({ message: 'Product deleted!' }).status(200);
	}
	return res.send({ message: 'Error deleting product' }).status(404).end();
};

module.exports = {
	getProducts,
	getSingleProduct,
	newProduct,
	editProduct,
	deleteProduct,
};
