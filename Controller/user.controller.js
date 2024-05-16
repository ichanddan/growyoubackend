import { User } from "../Models/user.models.js";

const signup = async (req, res) => {
  try {
    const data = req.body;
    const data_M = new User(data);
    const response = await data_M.save();
    res.status(201).json({ Message: "Signup succesfully" });
  } catch (error) {
    console.log("Signup faild ", error);
  }
};

const login = async (req, res) => {
  try {
    const Data = await User.find();
    res.status(201).json({ message: "Login succesfully",Data });
  } catch (error) {
    console.log("login faild", error);
  }
};

const Roll = async (req, res) => {
  try {
    const id = req.params.id;
    if (id == "Admin" || id == "User") {
      const Data = await User.find({ Roll: id });
      res.status(400).json(Data);
    }
  } catch (error) {
    console.log("Roll not find ", error);
  }
};

export { signup, login, Roll};
