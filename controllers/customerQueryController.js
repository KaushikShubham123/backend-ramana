var db = require('../models');
const CustomerQueryForm = db.customerQueryForm;


const addCustomerQury = async (data) => {

  const { name, email, phone, message, productName }
    = data;


  const newQuery = await CustomerQueryForm.create({
    name,
    email,
    phone,
    message,
    productName
  }
  );
  // const saveProduct = await newProduct.save();
  return newQuery;
}
module.exports = {
  addCustomerQury,

}