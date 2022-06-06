const express = require('express');
const cors = require('cors');
const cartController = require('./controllers/cartController');
const getProductsController = require('./controllers/getProductsController');
const app = express();
const port = 4000;

app.use(cors());

app.get('/products', getProductsController);
app.get('/cart', cartController);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
