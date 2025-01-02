const db = require('../models');
const CustomerProductQuery = db.customerproductquery;

// Function to create a new profile
const customerproductquery = async (data) => {
    const { productId, name, mobile, email, city, country, purchaseType, } = data



    const newQuery = await CustomerProductQuery.create({
        productId,
        name,
        mobile,
        email,
        city,
        country,
        purchaseType,

    });
    return newQuery;

};


module.exports = {

    customerproductquery,
};

