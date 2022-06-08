const discountCalculator = (product) => {
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  return { ...product, discountedPrice };
};

module.exports = { discountCalculator };
