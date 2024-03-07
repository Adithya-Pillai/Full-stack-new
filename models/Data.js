const { Int32 } = require('mongodb');
const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  Name: {
    type:String,
    required:true
  },
  Email_Id: {
    type:String,
    required:true
  },
  PhoneNo: {
    type:String,
    required:true
  },
  Type: {
    type:String,
    enum: ['Individual', 'Corporate', 'Institution'],
    required:true
  },
  Address: {
    type:String,
    required:true
  },
  Amount: {
    type:Number,
    required:true
  },
  Payment: {
    type:String,
    enum: ['UPI PAYMENT', 'CREDIT/DEBIT CARD'],
    required:true
  }
  },{ timestamps:true});

const Data = mongoose.model('Data_info', dataSchema);
module.exports = Data;