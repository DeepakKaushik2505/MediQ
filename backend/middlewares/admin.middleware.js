import jwt from "jsonwebtoken";

// admin auth middleware
const authAdmin = async (req, res, next) => {
  try {

    // Handle case-insensitive header
    const atoken = req.headers.atoken || req.headers.ATOKEN || req.headers.aToken || req.headers.authorization;
    if (!atoken) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    
    // The decoded token should match the concatenated admin email and password
    // that was used to create the token in loginAdmin
    if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized",
      });
    }

    next();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { authAdmin }