const User = require("../model/User.model");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    try {
    const { token } = req.cookies; // Request se cookie se token extract kiya hai

    if (!token) {
      return res.status(401).json({ error: "please login please" }); // Agar token nahi hai toh 401 Unauthorized status aur error message bheja gaya hai
    }
    
        const decode = jwt.verify(token, process.env.JWT_SECRET); // Token ko verify kiya hai using JWT_SECRET environment variable
        req.user = await User.findById(decode._id);
        // Decoded token se user ID (_id) nikala hai
        // User model se user find kiya hai using user ID

        next(); // Agar user mil gaya hai toh next middleware/function ko call kiya jayega
  } catch (error) {
    // Agar token verify nahi ho paya ya koi error aaya toh 401 Unauthorized status aur error message bheja gaya hai
    return res.status(401).json({ error: "Invalid token" });
  }
};
