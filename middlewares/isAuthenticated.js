const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "no headers found" });
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "token unavailable" });

  try {
    const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Access Denied", err: err.message });
  }
};

module.exports = isAuthenticated;
