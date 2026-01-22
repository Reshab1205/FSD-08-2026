const express = require("express");

const register = async (req, res) => {
  try {
    const inputData = req.body;
    console.log(inputData);
    return res.json({
      status_code: 200,
      message: "Registered Successfully",
      data: inputData,
    });
  } catch (err) {
    return res.json({ 
        status_code: 404, 
        message: "Registered Unsuccessfull" });
  }
};

const login = () => {};

const updateUser = () => {};

const deleteUser = () => {};

module.exports = { register, login, updateUser, deleteUser };
