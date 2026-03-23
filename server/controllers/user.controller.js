import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Someting is missing",
        success: false,
      });
    }
    const file = req.file;
    let cloudResponse = "";
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let url = null;
    if (file && cloudResponse) {
      url = cloudResponse.secure_url;
    }

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: url,
      },
    });

    return res.status(201).json({
      message: "Account created",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
