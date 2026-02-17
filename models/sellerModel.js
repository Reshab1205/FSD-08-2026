const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    type_of_address:{type:String, enum:["Home", "Work", "Others"]},
    house_no:{type:Number},
    address_Line_1:{type:String},
    address_Line_2:{type:String},
    landmark:{type:String},
    city:{type:String},
    state:{type:String},
    pin_code:{type:Number},
    nation:{type:String, default:'Bharat'},
    alternate_mobile_number:{type:Number}

}, {timestamps:true})





const sellerSchema = new mongoose.Schema({

    first_name: {type:String},
    last_name: {type:String},
    email: {type:String, unique:true, required:true },
    mobile_number: {type:Number,unique:true, required:true },
    password: {type:String },
    address: [addressSchema],
    aadhar_number:{type:Number, unique:true, required:true },
    my_orders: [{type:mongoose.Schema.Types.ObjectId, ref:'order'}],
    wallet: {
        amount:{type:Number},
    },
    total_earnings:{type:Number},
    gst_number:{type:String},
    gst_verification_status:{type:String, enum:["Done", "Pending", "Blocked", "Not_Verified"], default:"Not_Verified"}
}, {timestamps:true})

module.exports = mongoose.model('seller', sellerSchema)