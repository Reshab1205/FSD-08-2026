const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    product_name: {type:String, required:true},
    product_price:{type:Number},
    product_description:{type:String},

})


module.exports = mongoose.model('product', productSchema)