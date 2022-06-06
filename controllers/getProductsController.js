const { default: axios } = require('axios');

const getProductsController = async (req, res) => {
  let products;
  try {
    products = await axios.get('http://localhost:5000/products');
    res.json(products.data);
  } catch (error) {
    res.send('Something went wrong');
  }
};

module.exports = getProductsController;
