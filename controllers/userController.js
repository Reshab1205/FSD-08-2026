const express = require("express");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  try {
    const inputData = req.body;
    console.log(Object.keys(inputData).length);
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "Provide Proper Data for Registration",
      });
    }
    const checkEmail = await userModel.findOne({ email:inputData.email})
    const checkMobile = await userModel.findOne({ mobile_number:inputData.mobile_number})
    const checkAadhar = await userModel.findOne({ aadhar_number:inputData.aadhar_number})


    if(checkEmail || checkMobile || checkAadhar) {
      return res.json({
      status_code: 404,
      message: "User Exists Already",
    });
    }

    // console.log(inputData);
    const storeDb = await userModel.create(inputData)
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

const login = () => {};

const updateUser = () => {};

const deleteUser = () => {};

module.exports = { register, login, updateUser, deleteUser };
