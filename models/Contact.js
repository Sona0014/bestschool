const mongoose = require('mongoose')


const Contactschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
   
    description:{
        type:String,
        require:true

    },

},{timestamps:true})

const ContactModel = mongoose.model('contact',Contactschema)

module.exports=ContactModel