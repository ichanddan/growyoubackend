import { User } from "../Models/user.models.js";
import { genrateToken } from "../Middleware/jwt.auth.js";
import bcrypt from "bcrypt";

// Signup

const signup = async (req, res) => {
  try {
    const data = req.body;
    const data_M = new User(data);
    const response = await data_M.save();
    const paylod = {
      id: response.id,
      name: response.FullName,
      email: response.Email,
    };
    const token = genrateToken(paylod);
    res.status(201).json({ Message: "Signup succesfully", token: token });
  } catch (error) {
    console.log("Signup faild ", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// Login

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    const isMatchPassword = await bcrypt.compare(Password, user.Password);
    if (!user || !isMatchPassword) {
      return res.status(408).json({ message: " Wrong Email or Password " });
    }
    const paylod = {
      id: user.id,
      name: user.FullName,
      email: user.Email,
    };
    const token = genrateToken(paylod);
    res.status(201).json({ message: "Login succesfully", token: token });
  } catch (error) {
    console.log("Login faild ", error);
    res.status(500).json({ message: "Login failed" });
  }
};

const Profile = async (req, res) => {
  try {
    const data = req.user;
    const userId = data.id;
    const user = await User.findById(userId);
    res.status(201).json({user: user})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, login, Profile };
