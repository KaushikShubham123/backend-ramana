var db = require('../models');
const Product = db.productTable;
const User = db.user;

// const ProductTable = db.productTable;

const createNewproduct = async (data) => {

  const { vendorId, userId, productTitle, categories, productType, shortDesc, brand, unit, tags, exchangeable, refundable,specifications, productDesc, productImages: imageUrls, manufacturerName, manufacturerBrand, stocks, price, discount, status, visibility }
    = data;


  const newProduct = await Product.create({
    vendorId, userId, productTitle, categories, productType, shortDesc, brand, unit, tags, exchangeable, refundable, specifications,productDesc, productImages: imageUrls, manufacturerName, manufacturerBrand, stocks, price, discount, status, visibility
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


var getProducts = async (req, res) => {
  // find user
  const userdata = await User.findOne({ where: { id: req.userId } });
  const vendorId = userdata.vendorId;
  const data = await Product.findAll({ where: { vendorId } });

  res.status(200).json({ data: data });

}
var getProductById = async (req, res) => {
  // const  id  = req.params;
  // find user
  // const userdata = await User.findOne({ where: { id: req.userId } });
  // const vendorId = userdata.vendorId;
  const product = await Product.findOne({ where: { id :req.params.id} });

  res.status(200).json({ data: {
    ...product.toJSON(),
    productImages: product?.productImages ?JSON.parse(product.productImages) : []
  } });

}


var getAllProducts = async (req, res) => {

  const data = await Product.findAll();

  res.status(200).json({ data: data.map((product,/* specifications */) => ({
      ...product.toJSON(),
    //  ...specifications.toJSON(),
      productImages:JSON.parse(product.productImages),
      // specifications:JSON.parse(product.specifications)

    }
  ))});

}

module.exports = {
  createNewproduct,
  deleteProduct,
  getProducts,
  getAllProducts,
  getProductById
}