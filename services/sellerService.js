const mongoose = require('mongoose')
const sellerModel = require('../models/sellerModel')
const productModel = require('../models/productModel')

const findSeller = async ({email, mobile,aadhar}) => {
    await sellerModel.findOne({
      $or: [
        { email:email },
        { mobile_number:mobile},
        { aadhar_number: aadhar },
      ],
    })
}

const getAllProducts = async (id) => {
    const products = await productModel.aggregate([
        {
            $match:{product_sellers: new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup: {
                from:'sellers',
                localField:'product_sellers',
                foreignField: '_id',
                as:'sellerDetails'
            }
        }
    ])
    console.log(products)
    return products
}



module.exports = {findSeller, getAllProducts}