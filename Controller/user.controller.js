import { User } from "../Models/user.models.js";
import { genrateToken } from "../Middleware/jwt.auth.js";
import { Contects } from "../Models/contect.models.js";
import bcrypt from "bcrypt";
import { Blog } from "../Models/blog.models.js";

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
      roll: response.Roll
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
      roll: user.Roll
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


// user update
const userUpdate = async (req, res) => {
  try {
    const data = req.user;
    const userId = data.id;
    const { Address, Number, FullName } = req.body;
    const response = await User.findByIdAndUpdate(userId, { Address, Number,FullName });
    res.status(201).json({ message: "Update successfully", response });
  } catch (error) {
    console.error("Error update data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// send custom meassage

const contect = async (req, res) => {
  try {
    const data = req.body;
    const data_M = new Contects(data);
    const response = await data_M.save();
    res.status(201).json({ message: "Message Send succesfully" });
    console.log(response)
  } catch (error) {
    console.log("Message send faild", error);
    res.status(500).json({ message: "Internal server problem" });
  }
};

// blog post

const postBlog = async (req, res) => {
  try {
    const data = req.user;
    const userId = data.id;
    const UserData = await User.findById(userId);
    if (UserData.Roll === "admin") {
      const blogData = req.body;
      blogData.Author = UserData.FullName;
      blogData.AuthorImage = UserData.Image
      const blogDataSave = new Blog(blogData);
      const response = await blogDataSave.save();
      res.status(201).json({ Message: "Data recieved", response });
    } else {
      res.status(201).json({ Message: "User is not admin" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ Message: "Internal Server Problem" });
  }
};

// blog get
const getBlog = async (req, res) =>{
  try {
    const blogData = await Blog.find();
    res.status(201).json({ Message: "Data recieved", blogData });
  } catch (error) {
    console.log(error);

    res.status(500).json({ Message: "Internal Server Problem" });
  }
}


export { signup, login, Profile, userType, userUpdate, contect, postBlog, getBlog };
