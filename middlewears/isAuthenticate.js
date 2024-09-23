import jwt from "jsonwebtoken";

const isAuthenticate = async (req, res , next) => {
    try {
      const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({
        message: "User not authenticate",
        succes: false,
      });
    }

    const verify = jwt.verify(token , process.env.SECRET)
    if (!verify) {
        res.status(401).json({
            message: "invalid token",
            succes: false,
          });
    }

    req.id = verify.id;
    next();
  } catch (error) {
    console.log("Authentication Error" , error)
    return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
      });
  }
};

export default isAuthenticate