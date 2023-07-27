const BookModel = require('../../models/Book')

class BookController {
    static bookinsert = async (req, res) => {
        try {
            console.log(req.body);
            const result = new BookModel({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address
            })
            await result.save()
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
   
    

}
module.exports = BookController