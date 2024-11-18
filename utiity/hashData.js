const bycrypt = require("bcrypt")

const hashData = async (data, saltRounds = 10) => {

  const hasheddata = await bycrypt.hash(data, saltRounds);

  return hasheddata;
}

const verifyingHashedData = async (unhashed, hashed) => {
  const match = await bycrypt.compare(unhashed, hashed);
  return match;

}

module.exports = { hashData, verifyingHashedData };


