const mongoose = require('mongoose')

const local_Url="mongodb://127.0.0.1:27017/bestschool"
const live_url ="mongodb+srv://soniyagurjar6666:ram123@cluster0.eleumlq.mongodb.net/bestschool?retryWrites=true&w=majority"

const connectdb = ()=>{

    return mongoose.connect(live_url)
        .then(()=>{
            console.log("connected successfully")
        }).catch((err) =>{
            console.log(err);
        })
}
module.exports = connectdb