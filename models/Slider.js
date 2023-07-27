const mongoose = require('mongoose')
const Sliderschema = new mongoose.Schema({
    tittle:{
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
const SliderModel = mongoose.model('slider',Sliderschema)
module.exports = SliderModel