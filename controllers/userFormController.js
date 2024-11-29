var db = require('../models');
const { validCategories } = require('../constant');
const UserForm = db.userform;

//To create new form
const createNewForm = async (data) => {
  const { name, mobile, email, message, itemCategory } = data

  if (!validCategories.includes(itemCategory)) {

    throw Error("Invalid Item-Category. It must be one of the following: furniture, machine, electronics, textile, others.")
  }


  const newForm = await UserForm.create({
    name,
    mobile,
    email,
    message,
    itemCategory

  });

  return newForm;
}





//To get forms
const getForm = async (req, res) => {
  const id = req.params.id;

  const data = await UserForm.findOne({ where: { id } });
  res.status(200).json({ data: data });
}




module.exports = {
  getForm,
  createNewForm,

}