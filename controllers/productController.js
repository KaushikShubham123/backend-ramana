var db = require('../models');
const Product = db.productTable;
// const ProductTable = db.productTable;

const createNewproduct = async (data) => {

  const { vendorId, userId, productTitle, categories, productType, shortDesc, brand, unit, tags, exchangeable, refundable, productDesc, productImages, manufacturerName, manufacturerBrand, stocks, price, discount, status, visibility }
    = data;


  const newProduct = await Product.create({
    vendorId, userId, productTitle, categories, productType, shortDesc, brand, unit, tags, exchangeable, refundable, productDesc, productImages, manufacturerName, manufacturerBrand, stocks, price, discount, status, visibility
  }
  );
  // const saveProduct = await newProduct.save();
  return newProduct;
}

var deleteProduct = async (req, res) => {

  const data = await Product.destroy({
    where: { id: req.params.id }
  }
  );
  res.status(200).json({ data: data });
}



module.exports = {
  createNewproduct,
  deleteProduct
}