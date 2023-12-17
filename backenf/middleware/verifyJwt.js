const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //   console.log(authHeader);
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  //   console.log(token);
  if (!token) return res.sendStatus(404);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.id = decoded._id;
    next();
  });
};
