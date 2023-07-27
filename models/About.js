const mongoose = require('mongoose')
const Aboutschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    des:{
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
const AboutModel = mongoose.model('about',Aboutschema)
module.exports = AboutModel