const express = require("express");
const userModel = require("../models/userModel");
const { configDotenv } = require("dotenv");
const bcrypt = require("bcrypt");


const userService = require("../services/userService");
const generateToken = require("../utility/createToken");
const { generateOTP } = require("../utility/generateOTP");

configDotenv();

const register = async (req, res) => {
  try {
    let inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "Provide Proper Data for Registration",
      });
    }
    const checkData = await userService.findUser({
      email: inputData.email,
      mobile: inputData.mobile_number,
      aadhar: inputData.aadhar_number,
    });

    console.log(checkData);
    if (checkData) {
      return res.json({
        status_code: 404,
        message: "User Exists Already",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(inputData.password, salt);

    const newData = { ...inputData, password: hash };
    console.log(newData);

    const storeDb = await userModel.create(newData);
    console.log(storeDb);
    return res.json({
      status_code: 200,
      message: "Registered Successfully",
      data: storeDb,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status_code: 404,
      message: "Registered Unsuccessfull",
    });
  }
};

const login = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.status(404).json({ message: "Provide Data to Login" });
    }
    
    const checkData = await userModel.findOne({ email: inputData.email });
    console.log(checkData)
    if (!checkData) {
      return res.status(404).json({ message: "Account Does not Exists" });
    }
    const isMatch = await bcrypt.compare(
      inputData.password,        
      checkData.password         
    );

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
      const token = generateToken.generateToken(checkData.email, checkData.role);
      console.log("token", token);
      return res
        .status(200)
        .json({ message: "Logged In Successfully", token: token });
    
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};

const loginWithOtp = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.status(404).json({ message: "Provide Data to Login" });
    }

    const checkData = await userModel.findOne({
      mobile_number: inputData.mobile_number,
    });
    if (!checkData) {
      return res.status(404).json({ message: "Account Does not Exists" });
    }
    const otp = generateOTP();
    console.log(otp);
    return res.status(200).json({ message: "OTP sent", data: otp });
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (Object.keys(req.body).length === 0) {
      return res.status(404).json({ message: "Provide Data to Login" });
    }

    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res
      .status(200)
      .json({ message: "Updated Successfully", data: updateUser });
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Registered Unsuccessfull",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (deleteUser) {
      return res.json({
        status_code: 200,
        message: "Deleted successfully",
      });
    } else {
      return res.json({
        status_code: 404,
        message: "User Not Found",
      });
    }
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};



const uploadPDf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status_code: 400,
        message: "No File Uploaded",
      });
    }
    return res.json({
      status_code: 200,
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};

const nodemailer = require('nodemailer')


const sendMail = async(req,res) => {

  const inputData = req.body
  const mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {user: process.env.user, pass: process.env.pass }
  })
  mail.sendMail({
    from: process.env.user,
    to: inputData.email,
    subject: 'Test Mail',
    html: 'Testing My Email'
  }, (err) => {
    if (err) throw err;
    return true
  })
 return res.json({
        status_code: 200,
        message: "Email sent successfully",
      });}

const getUsers = async (req,res) => {
  try {
    const users = await userModel.find()
    return res.status(200).json({message: 'Users list', data:users})
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  loginWithOtp,
  uploadPDf,
  sendMail,getUsers
};
