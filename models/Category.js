const mongoose = require('mongoose')
const Categoryschema = new mongoose.Schema({
    name:{
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
const CategoryModel = mongoose.model('category',Categoryschema)
module.exports = CategoryModel