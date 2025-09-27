import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Somthing you miss",
        success: false,
      });
    };

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "user already exist with this email",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile:{
                profilePhoto:cloudResponse.secure_url,
            }
    });

    return res.status(201).json({
      message: "Account created successedfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Somthing you miss",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "incorect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "incorect email or password",
        success: false,
      });
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "account doesnt exsit",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAvg: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout suceesfully.",
      success: true,
    });
  } catch {}
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skill } = req.body;
    console.log(fullname,email,phoneNumber,bio,skill);
    

    const file = req.file;

    // if (!fullname || !email || !phoneNumber || !bio || !skill) {
    //   return res.status(400).json({
    //     message: "Somthing you miss",
    //     success: false,
    //   });
    // }

    // cloudinary aega idhr..

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    console.log("cloudinary response", cloudResponse);



    let skillArray;
    if(skill){
        skillArray = skill.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    //updating data


    if(fullname) user.fullname = fullname
    if(email) user.email = email
    if(phoneNumber) user.phoneNumber =phoneNumber
    if(bio) user.profile.bio =bio
    if(skill) user.profile.skill = skillArray



    // (user.fullname = fullname),
    //   (user.email = email),
    //   (user.phoneNumber = phoneNumber),
    //   (user.profile.bio = bio),
    //   (user.profile.skill = skillArray);


    // resume comes later here

     if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }

    return res.status(200).json({
        message:"profile update successfully",
        user,
        success:true
    })


  } catch {}
};
