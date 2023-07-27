const mongoose = require('mongoose')
const Adminschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        public_id:{
            type: String,
        },
        url: {
            type: String
        }
    },


},{timestamps:true})
const AdminModel = mongoose.model('Admin',Adminschema)

module.exports = AdminModel