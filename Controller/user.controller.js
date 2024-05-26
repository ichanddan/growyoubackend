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


// Profile
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


// userType
const userType = async (req, res) => {
  try {
    const UserT = req.params.id;
    if (UserT === "admin" || UserT === "ceo" || UserT === "cto" || UserT === "team") {
      const Data = await User.find({ Roll: UserT });
      console.log(Data)
      res.status(200).json({ message: "Data fetched successfully", data: Data });
      console.log("Data fetched");
    } else {
      res.status(400).json({ message: "Invalid user type" });
      console.log("User Type not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { signup, login, Profile, userType };
