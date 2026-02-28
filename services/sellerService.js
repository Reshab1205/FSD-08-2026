const mongoose = require('mongoose')
const sellerModel = require('../models/sellerModel')
const productModel = require('../models/productModel')
const { pipeline } = require('nodemailer/lib/xoauth2')

const findSeller = async ({email, mobile,aadhar}) => {
    await sellerModel.findOne({
      $or: [
        { email:email },
        { mobile_number:mobile},
        { aadhar_number: aadhar },
      ],
    })
}

const getAllProductsWithSellerDetails = async(id) => {
    const products = await productModel.aggregate([
        {
            $match:{product_sellers: new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup: {
                from: 'sellers',
                let: { sellerId: '$product_sellers' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$sellerId'] }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            first_name: 1,
                            last_name: 1
                        }
                    }
                ],
                as: 'sellerDetails'
            }
        }
    ])
        return products
}

const getAllProducts = async (id) => {
    const products = await productModel.aggregate([
        {
            $match:{product_sellers: new mongoose.Types.ObjectId(id)}
        },
        
        // {
        //     $lookup: {
        //         from:'sellers',
        //         localField:'product_sellers',
        //         foreignField: '_id',
        //         as:'sellerDetails'
        //     }
        // }
        // {
        //     $project: {
        //         _id:0,
        //         product_name:1,
        //     }
        // }
    ])
    console.log(products)
    return products
}



module.exports = {findSeller, getAllProducts, getAllProductsWithSellerDetails}