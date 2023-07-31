const BookModel = require('../../models/Book')
const nodemailer =require('nodemailer')

class BookController {
    static bookinsert = async (req, res) => {
        try {
            //console.log(req.body);
            const{name,email} =req.body
            const result = new BookModel({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address
            })
            await result.save()
            this.sendEmail(name,email)
            res.redirect('/admin/book')
        } catch (error) {
            console.log(error);
        }
    }
    static bookDisplay = async (req, res) => {
        try {
            //res.send('hello')
            const { name, image } = req.data1
            const data = await BookModel.find()
        
            //console.log(data);
            res.render('admin/book/view', { d: data, n: name, img: image})
        } catch (error) {
            console.log(error);
        }
    }
    static sendEmail = async (name, email) => {
        //console.log("email sending")
        //console.log("schoolName")
        //console.log(name,email)

        //connect with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "soniyagurjar6666@gmail.com",
                pass: "dscrmqayredqoili",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", //sender address
            to: email, //list of recievers
            subject: "create School Registration Successfully", //subject line
            text: "hello", // plain text body
            html: `<b>${name}</b> Book School is Successful!`, //html body
        });
        console.log("Message sent: %s", info.messageId);
    };
   
    

}
module.exports = BookController