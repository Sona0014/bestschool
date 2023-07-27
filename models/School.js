const mongoose = require('mongoose')
const Schoolschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    des:{
        type:String,
        require:true
    },
    affiliatedBoard:{
        type:String,
        require:true
    },
    instructionMedium:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    PhoneNumber:{
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
const SchoolModel = mongoose.model('School',Schoolschema)

module.exports = SchoolModel