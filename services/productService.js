const mongoose = require('mongoose')
const productModel = require('../models/productModel')

const findProduct = async ( product_code ) => {
   return await productModel.findOne({ product_code: product_code })
}



module.exports = {findProduct}