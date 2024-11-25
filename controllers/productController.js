var db = require('../models');
const ProductCategory = db.productCategory;
// const ProductTable = db.productTable;

const createNewCategory = async (nameOfcategory) => {

  const newCategory = await ProductCategory.create(
    nameOfcategory

  )

  return newCategory;
}

var deleteProductCategory = async (req, res) => {

  const data = await ProductCategory.destroy({
    where: { id: req.params.id }
  }
  );
  res.status(200).json({ data: data });
}



module.exports = {
  createNewCategory,
  deleteProductCategory
}