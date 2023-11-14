const jwt = require('jsonwebtoken');

const secret =  "Lionel";


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (!token) {
      throw new Error('Token not found');
    }

    const decoded = jwt.verify(token, secret);

    res.json(decoded);
  } catch (error) {
    console.error('Error decoding token:', error.message);
    res.sendStatus(403);
  }
};

module.exports = verifyToken;


// if(!token){
//   return res.status(403).json({ message: 'No token provided' });
// }
// try{
//   const decoded = jwt.verify(token, secret);
//   req.user = decoded;
// }catch(err){
//     return res.status(401).json({ message: 'Invalid token' })
// }