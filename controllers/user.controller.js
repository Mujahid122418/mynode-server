import userModal from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fileToDataURI from "../middlewears/dataUri.js";
import cloudinary from "../middlewears/cloudinary.js";

dotenv.config();

//USER REGISTER
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All Fileds are Require",
      success: true,
    });
  } else {
    try {
      const alreadyUser = await userModal
        .findOne({ email })
        .select("-password");
      if (alreadyUser) {
        return res.status(400).json({
          message: "This Email Already Exsist",
          success: false,
          user: alreadyUser,
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        userModal
          .create({ username, email, password: hashedPassword })
          .then((user) => {
            const fulluser = user.toObject();
            delete fulluser.password;

            return res.status(200).json({
              message: "User Create Successfully",
              success: true,
              user: fulluser,
            });
          });
      }
    } catch (error) {
      console.log("registration error", error);
    }
  }
};

//USER LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        message: "All Fields are require",
        success: false,
      });
    }

    const user = await userModal.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(404).json({
        message: "Password is incorrect",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      message: "Login Successfully",
      success: true,
    });
  } catch (error) {
    console.log("login Error", error);
  }
};

//USER LOGOUT
export const logout = async (_, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
    });

    res.status(200).json({
      message: "user Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
  }
};

//EDIT PROFILE
export const editProfile = async (req, res) => {
  try {
    const userID = req.id;

    const haveuser = await userModal.findById(userID).select("-password");

    if (!haveuser) {
      res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    const { bio, gender } = req.body;
    const file = req.file;
    let cloudinaryy;

    if (file) {
      const fileURI = fileToDataURI(file);
      cloudinaryy = await cloudinary.uploader.upload(fileURI, {
        folder: "insta_clone/profile_images",
      });
    }

    if (bio) haveuser.bio = bio;
    if (gender) haveuser.gender = gender;
    if (file) haveuser.profilePicture = cloudinaryy.secure_url;
    await haveuser.save();
    console.log(haveuser);

    res.status(200).json({
      message: "User Update SuccessFully",
      success: true,
      haveuser,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
      success: false,
    });
  }
};

//GET SUGESTIS USERS
export const suggestUser = async (req, res) => {
  try {
    const userID = req.id;
    const loginUser = await userModal.find({ _id: userID });
    const users = await userModal.aggregate([
      { $match: { email: { $ne: loginUser[0].email } } },
      { $sample: { size: 10 } },
      { $project: { password: 0 } },
    ]);

    res.status(200).json({
      message: "user get successfully",
      success: true,
      users,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
      success: false,
    });
  }
};

//FOLLOW OR UNFOLLOW LOGIC
export const followUnfollow = async (req, res) => {
  try {
    const followID = req.params.followId;
    const userID = req.id;

    const user = await userModal.findById(userID).select("-password");
    const follow = await userModal.findById(followID).select("-password");
   
    if (!user || !follow) {
      res.status(404).json({
        message: 'user not found',
        success: false,
      });
    }
    const isFollow = user.following.includes(followID);
    if (isFollow) {
      await Promise.all([
        userModal.updateOne({_id:userID} , {$pull:{following:followID}}),
        userModal.updateOne({_id:followID} , {$pull:{follower:userID}})
      ]).then(()=>{
        res.status(200).json({
          message: 'Unfollow Successfully',
          success: true,
        })
      })
      
    }else{
      await Promise.all([
        userModal.updateOne({_id:userID} , {$push:{following:followID}}),
        userModal.updateOne({_id:followID} , {$push:{follower:userID}})
      ]).then(()=>{
        res.status(200).json({
          message: 'follow Successfully',
          success: true,
        })
      })
    }
   

  } catch (error) {
    res.status(401).json({
      error: error,
      success: false,
    });
  }
};
