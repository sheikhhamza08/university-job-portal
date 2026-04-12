import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authorized", success: false });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};

export default authUser;
