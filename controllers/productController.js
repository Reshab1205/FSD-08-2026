const express = require("express");
const productModel = require("../models/productModel");
const productService = require("../services/productService");

const createProduct = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "Provide Proper Data for Registration",
      });
    }
    const checkData = await productService.findProduct(inputData.product_code);
    if (checkData) {
      return res.json({
        status_code: 404,
        message: "Product Exists Already",
      });
    }

    const storeDb = await productModel.create(inputData);
    return res.json({
      status_code: 200,
      message: "Product Created Successfully",
      data: storeDb,
    });
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};

const findProductByCode = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "Provide Proper Data To Find Product",
      });
    }
    const findProduct = await productService.findProduct(inputData.product_code)
    return res.status(200).json({ message: 'Product Found', data:findProduct})
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createProduct, findProductByCode };
