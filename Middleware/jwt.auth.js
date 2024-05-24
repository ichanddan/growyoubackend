import jwt from "jsonwebtoken";


// verify token 
const authToken = (req, res, next) => {
  const token = req.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unathorizatiod" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.user = decode;
  } catch (error) {
    console.log(error);
    res.status(408).json({ error: "invelid token" });
  }
};



// genrate token 
const genrateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_KEY);
};



export { authToken, genrateToken };
