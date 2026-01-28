import jwt from "jsonwebtoken";
import User from "../model/userModel.js";


export const verifyUserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - Not authenticated" });
    }
    if (!roles.includes(req.user.role)) {
      console.log(`Access denied. User role: ${req.user.role}, Required roles: ${roles.join(', ')}`);
      return res.status(403).json({ message: `Forbidden - Requires ${roles.join(' or ')} role` });
    }
    next();
  };
};
