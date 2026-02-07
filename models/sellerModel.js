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

const paymentSchema = new mongoose.Schema({
   mode_of_payment:{type:String, enum:["UPI","CASH","CREDIT_CARD", "DEBIT_CARD", "NET_BANKING", "EMI", "PAY_LATER", "WALLETS", "GIFT_CARD", "SUPER_COINS"]},
   credit_card_details:{
    card_number:{type:Number, unique:true},
    CVV:{type:Number},
    expiry_date:{type:String},
    card_holder_name:{type:String}
   },
   debit_card_details:{
    card_number:{type:Number, unique:true},
    CVV:{type:Number},
    expiry_date:{type:String},
    card_holder_name:{type:String}
   }
}, {timestamps:true})

const feedbackSchema = new mongoose.Schema({
    feedback_description:{type:String},
    ratings:{type:Number}
}, {timestamps:true})



const sellerSchema = new mongoose.Schema({

    first_name: {type:String, required:true},
    last_name: {type:String},
    email: {type:String, unique:true, required:true},
    mobile_number: {type:Number,unique:true, required:true},
    password: {type:String, required:true},
    address: [addressSchema],
    payment_methods: [paymentSchema],
    my_orders: [{type:mongoose.Schema.Types.ObjectId, ref:'order'}],
    wallet: {
        amount:{type:Number},   
    },
    total_earnings:{type:Number},
    gst_number:{type:String, unique:true, required:true},
    gst_verification_status:{type:String, enum:["Done", "Pending", "Blocked", "Not_Verified"], default:"Not_Verified"},
    aadhar_number:{type:Number, unique:true, required:true},
    pan_number:{type:String, unique:true, required:true},
    wallet_kyc_status:{
        status:{type:String, enum:["Active", "Inactive", "Pending", "Blocked"], default:"Inactive"},
        aadhar_verification_status:{type:String, enum:["Done", "Pending", "Blocked", "Not_Verified"], default:"Not_Verified"},
        pan_verification_status:{type:String, enum:["Done", "Pending", "Blocked", "Not_Verified"], default:"Not_Verified"}
    },
    seller_feedback: [feedbackSchema],


}, {timestamps:true})

module.exports = mongoose.model('seller', sellerSchema)