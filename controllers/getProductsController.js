const { default: axios } = require('axios');
const { DB_BASE_URL } = require('../config');
const { discountCalculator } = require('../utils/priceUtils');

const getProductsController = async (req, res) => {
  const { page, size } = req.query;
  let response;
  try {
    response = await axios.get(
      `${DB_BASE_URL}products?_page=${page}&_limit=${size}`
    );
    res.json({
      items: response.data.map((item) => discountCalculator(item)),
      totalCount: response.headers['x-total-count'],
    });
  } catch (error) {
    console.error(error);
    res.send('Something went wrong');
  }
};

module.exports = getProductsController;
