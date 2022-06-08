const { default: axios } = require('axios');
const { DB_BASE_URL } = require('../config');
const { discountCalculator } = require('../utils/priceUtils');

const postCartController = async (req, res) => {
  const id = req.body.id;
  let response;
  try {
    const existingItem = await axios.get(`${DB_BASE_URL}cartItems/${id}`);
    if (existingItem.data) {
      req.body.quantity = existingItem.data.quantity + 1;
      response = await axios.put(`${DB_BASE_URL}cartItems/${id}`, req.body);
    } else {
      req.body.quantity = 1;
      response = await axios.post(`${DB_BASE_URL}cartItems`, req.body);
    }
  } catch (error) {
    console.error(error);
    res.send('Something went wrong');
  }
  res.json(response.data);
};

const getCartController = async (req, res) => {
  let response;
  try {
    response = await axios.get(`${DB_BASE_URL}cartItems`);
    const cartTotal = response.data.reduce((prev, next) => {
      console.log(prev, next);
      prev += next.quantity * next.price * (1 - next.discountPercentage / 100);
      console.log(prev);
      return prev;
    }, 0);
    res.json({
      items: response.data.map((item) => discountCalculator(item)),
      cartTotal: cartTotal.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.send('Something went wrong');
  }
};

const getCartItemCount = async (req, res) => {
  let response;
  try {
    response = await axios.get(`${DB_BASE_URL}cartItems`);
    const cartItemCount = response.data.reduce((prev, next) => {
      prev += next.quantity;
      return prev;
    }, 0);
    res.json({ cartItemCount });
  } catch (error) {
    console.error(error);
    res.send('Something went wrong');
  }
};

module.exports = { postCartController, getCartController, getCartItemCount };
