const jwt = require('jsonwebtoken');
const { TOKEN_KEY, TOKEN_EXPIRY } = process.env

const createToken = async (tokenData,
  tokenKey = TOKEN_KEY,
  expiresIn = TOKEN_EXPIRY
) => {
  const token = await jwt.sign(tokenData, tokenKey, { expiresIn });


  return token;
  // try{
  //   const decoded =jwt.verify(token, processs.env.TOKEN_KEY);
  //   req.user=decoded
  //   next();
  // }
  // catch(err){console.error(err);
  //   res.status(401).json({error:'Invalid Token'});
  // }
}
module.exports = createToken;
