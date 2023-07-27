const express= require('express')
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const SchoolController = require('../controllers/admin/SchoolController')
const CategoryController = require('../controllers/admin/CategoryController')
const AboutController = require('../controllers/admin/AboutController')
const checkLogin =require('../middleware/auth')
const SliderController = require('../controllers/admin/SliderController')
const ContactController = require('../controllers/admin/ContactController')
const BookController = require('../controllers/admin/BookController')
const route =express.Router()

   
//frontController route
route.get('/',FrontController.home)
route.get('/contact',FrontController.contact)
route.get('/login',FrontController.login)
route.get('/schooldata',FrontController.schooldata)
route.get('/schooldetail/:id',FrontController.schooldetail)
route.get('/school_list/:id',FrontController.schoollist)

//admin part
route.get('/admin/dashboard',checkLogin,AdminController.dashboard)
route.get('/register',AdminController.register)
route.post('/admininsert',AdminController.admininsert)
route.post('/verifylogin',AdminController.verifylogin)
route.get('/logout',AdminController.logout)


//admin //SchoolController
route.get('/admin/addschool',checkLogin,SchoolController.addschool)
route.post('/admin/insertschool',checkLogin,SchoolController.insertschool)
route.get('/admin/schoolView/:id',checkLogin,SchoolController.viewschool)
route.get('/admin/schoolEdit/:id',checkLogin,SchoolController.editschool)
route.post('/admin/schoolupdate/:id',checkLogin,SchoolController.updateschool)
route.get('/admin/schooldelete/:id',checkLogin,SchoolController.deleteschool)


//admin /categorycontroller
route.get('/admin/addcategory',checkLogin,CategoryController.addcategory)
route.post('/admin/insertcategory',checkLogin,CategoryController.insertcategory)
route.get('/admin/Categoryview/:id',checkLogin,CategoryController.viewcategory)
route.get('/admin/CategoryEdit/:id',checkLogin,CategoryController.editcategory)
route.post('/admin/Categoryupdate/:id',checkLogin,CategoryController.updatecategory)
route.get('/admin/Categorydelete/:id',checkLogin,CategoryController.deletecategory)

//admin /AdminController
route.get('/admin/addabout',checkLogin,AboutController.addabout)
route.post('/admin/insertabout',checkLogin,AboutController.insertabout)
route.get('/admin/aboutView/:id',checkLogin,AboutController.viewabout)
route.get('/admin/aboutEdit/:id',checkLogin,AboutController.editabout)
route.post('/admin/aboutupdate/:id',checkLogin,AboutController.updateabout)
route.get('/admin/aboutdelete/:id',checkLogin,AboutController.deleteabout)



//admin//SliderController
route.get('/admin/addslider',checkLogin,SliderController.addslider)
route.post('/admin/insertslider',checkLogin,SliderController.insertslider)
route.get('/admin/Sliderview/:id',checkLogin,SliderController.viewslider)
route.get('/admin/SliderEdit/:id',checkLogin,SliderController.editslider)
route.post('/admin/Sliderupdate/:id',checkLogin,SliderController.updateslider)
route.get('/admin/Sliderdelete/:id',checkLogin,SliderController.deleteslider)


//admin/contact/contactcontroller

route.get('/admin/addcontact',checkLogin,ContactController.addcontact)
route.post('/admin/insertcontact',checkLogin,ContactController.insertcontact)
route.get('/admin/contactView/:id',checkLogin,ContactController.viewcontact)
route.get('/admin/contactedit/:id',checkLogin,ContactController.editcontact)
route.post('/admin/contactupdate/:id',checkLogin,ContactController.updatecontact)
route.get('/admin/contactdelete/:id',checkLogin,ContactController.deletecontact)

//bookController
route.post('/bookinsert',BookController.bookinsert)
route.get('/admin/book',checkLogin,BookController.bookDisplay)










module.exports= route