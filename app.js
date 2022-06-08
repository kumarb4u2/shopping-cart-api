const express = require('express');
const cors = require('cors');
const {
  postCartController,
  getCartController,
  getCartItemCount,
} = require('./controllers/cartController');
const getProductsController = require('./controllers/getProductsController');
const { PORT } = require('./config');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/products', getProductsController);
app.post('/cartItems', postCartController);
app.get('/cartItems', getCartController);
app.get('/cartItemCount', getCartItemCount);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
