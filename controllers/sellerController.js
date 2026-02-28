const express = require("express");
const bcrypt = require("bcrypt");
const sellerService = require("../services/sellerService");
const sellerModel = require("../models/sellerModel");
const { generateToken } = require("../utility/createToken");

const createSeller = async (req, res) => {
  console.log(req.body)
  try {
    let inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "Provide Proper Data for Registration",
      });
    }
    const checkData = await sellerService.findSeller({
      email: inputData.email,
      mobile: inputData.mobile_number,
      aadhar: inputData.aadhar_number,
    });

    console.log(checkData);
    if (checkData) {
      return res.json({
        status_code: 404,
        message: "Seller Exists Already",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(inputData.password, salt);

    const newData = { ...inputData, password: hash };
    console.log(newData);

    const storeDb = await sellerModel.create(newData);
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

const getAllProductsOfASeller = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const getData = await sellerService.getAllProducts(id);
    console.log("getData", getData);
    res.send(getData);
  } catch (err) {
    console.log(err);
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};

const getProductsWithSellerDetails = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const getData = await sellerService.getAllProductsWithSellerDetails(id);
    console.log("getData", getData);
    res.send(getData);
  } catch (err) {
    console.log(err);
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};



const updateSeller = async (req, res) => {
  try {
  } catch (err) {}
};

const deleteSeller = async (req, res) => {
  try {
  } catch (err) {}
};

const getAllSellers = async (req, res) => {
  try {
    const sellers = await sellerModel.find().select("-password")
    res.status(200).json({message: 'Sellers', data:sellers})
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};

const getSellerById = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  createSeller,
  getAllProductsOfASeller,
  updateSeller,
  deleteSeller,
  getAllSellers,
  getSellerById,
  getProductsWithSellerDetails,
};
