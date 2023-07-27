const CategoryModel =require('../models/Category')
const SchoolModel = require('../models/School')
const sliderModel =require('../models/Slider')
const BookModel =require('../models/Book')
const BookController = require('./admin/BookController')


class FrontController {
    static home = async (req, res) => {
        try {
            const category =await CategoryModel.find()
            const Slider =await sliderModel.find()
            const Book =await BookModel.find()
            //console.log(category);
            res.render('home',{c:category,s:Slider,b:Book})
        } catch (err) {
            console.log(err)
        }
    }
    static contact = async (req, res) => {
        try {
            res.render('contact')
        } catch (err) {
            console.log(err)
        }
    }
    static login = async (req, res) => {
        try{
            res.render('login',{message1:req.flash('success'),message2:req.flash('error')})
        } catch (err){
            console.log(err)
        }
    }
    static schooldata = async (req,res) => {
        try {
            res.render('schooldata')
        }catch (err){
            console.log(err)
        }
    }

    static schooldetail = async (req, res) => {
        try{
            const data = await SchoolModel.findById(req.params.id)
            res.render('schooldetail',{d:data})
        } catch (err){
            console.log(err)
        }
    }

    static schoollist = async (req, res) => {
        try{
            const categoryname = req.params.id;
            //console.log(name);
            const data =await SchoolModel.find({category:categoryname})
            //console.log(data);
            res.render('schoollist',{d:data,n:categoryname})
        } catch (err){
            console.log(err)
        }
    }



}
module.exports = FrontController