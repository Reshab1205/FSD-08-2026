const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded
    //   console.log(decoded);
      next();
    } catch (err) {
        return res.status(500).json({ message: "Access Denied" });
    }
} else {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    next();
    }

}

module.exports = { protect, authorizeRoles };
