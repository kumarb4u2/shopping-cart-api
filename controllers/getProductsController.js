const { default: axios } = require('axios');
const { DB_BASE_URL } = require('../config');
const { discountCalculator } = require('../utils/priceUtils');

const getProductsController = async (req, res) => {
  let products;
  try {
    products = await axios.get(`${DB_BASE_URL}products`);
    res.json(products.data.map((item) => discountCalculator(item)));
  } catch (error) {
    console.error(error);
    res.send('Something went wrong');
  }
};

module.exports = getProductsController;
