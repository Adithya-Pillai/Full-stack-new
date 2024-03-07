const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  Username: {
    type:String,
    required:true
  },
  Password: {
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
  Subscribed: {
    type:Boolean,
    required:true
  },
} , { timestamps:true});

const User = mongoose.model('User_info', userSchema);
module.exports = User;