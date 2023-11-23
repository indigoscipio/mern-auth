import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";

//AUTH
const authUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      // Send a 401 Unauthorized response if the user or password is incorrect
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User exists");
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (err) {
    console.log(err);
  }
};

//LOGOUT
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.log(err);
  }
};

//GET PROFILE
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

//UPDATE PROFILE
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);

  try {
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      console.log(updatedUser);
      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("user not found");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  authUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  registerUser,
};
