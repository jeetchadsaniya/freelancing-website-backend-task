const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const { name, email, password, roll } = req.body;
    if (!name) {
      res.status(400).send({ statusCode: 400, message: "name is required" });
      return;
    }
    if (!email) {
      res.status(400).send({ statusCode: 400, message: "email is required" });
      return;
    }
    if (!password) {
      res
        .status(400)
        .send({ statusCode: 400, message: "password is required" });
      return;
    }
    if (!roll) {
      res.status(400).send({ statusCode: 400, message: "rollwwwww is required" });
      return;
    }
    if (password.lenght < 5) {
      res.status(400).send({
        statusCode: 400,
        message: "password must have minimum 5 char",
      });
      return;
    }
    if (roll != "admin" && roll != "client" && roll != "freelancer") {
      res.status(400).send({
        statusCode: 400,
        message: "roll must have only admin, client, freelancer",
      });
      return;
    }

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      res.status(400).send({ statusCode: 400, message: "email already exist" });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      roll,
    });
    res.status(201).send({
      statusCode: 201,
      data: user,
      message: "user register successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).send({ statusCode: 400, message: "email is required" });
      return;
    }
    if (!password) {
      res
        .status(400)
        .send({ statusCode: 400, message: "password is required" });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({ statusCode: 404, message: "user dont exist" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res
        .status(400)
        .send({ statusCode: 400, message: "enter valid password" });
      return;
    }

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      statusCode: 200,
      data: accessToken,
      message: "user login successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const testController = async (req, res) => {
  console.log(req.originalUrl);
  res.status(200).send("test controller");
};

module.exports = Object.freeze({
  registerController,
  loginController,
  testController,
});
