const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// USER SIGNUP
// Check if user already exist
// If yes, send User already exist message.
// If new user, Hash the given password.
// create a new user with given email , the hashed password and name.
// send Registration successfull message
// authenticate

exports.signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(400).json({ message: "User Alreadt Exist" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword)
    return res.status(500).json({ message: "Something went wrong" });

  User.create({
    fullName: fullName,
    email: email,
    password: hashedPassword,
  })
    .then((user) => {
      const userData = {
        email: user.email,
        fullName: user.fullName,
      };
      const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN);
      res
        .status(200)
        .header("auth-token", accessToken)
        .json({ message: "Sign Up Successful", accessToken });
    })
    .catch((err) => {
      res.status(400).json({ message: "Sign Up Failed", error: err.message });
    });
};

// USER LOGIN
// Check if email exists.
// If not, send User does not exist.
// If existing user, compare passowrd with hashed password.
// if matched, generate token and send

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "User not found" });

  try {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched)
      return res
        .status(403)
        .json({ message: "Authentication Failed, Password do not match" });

    const userData = {
      email: user.email,
      fullName: user.fullName,
    };
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN);
    res
      .status(200)
      .header("auth-token", accessToken)
      .json({ message: "Sign in successful", accessToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err: err.message });
  }
};
