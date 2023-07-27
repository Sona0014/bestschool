const AdminModel = require('../../models/Admin')
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

cloudinary.config({
    cloud_name: 'dfoy2i7th',
    api_key: '617898158181495',
    api_secret: '__7KhA6JElPhysBEQZ4yS0KsC-Y'
});

class AdminController {

    static dashboard = async (req, res) => {
        try {
            //console.log(req.data1);
            const{name,image}=req.data1
            res.render('admin/dashboard',{n:name,img:image})
        } catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            res.render('admin/register', { message: req.flash('error') })

        } catch (error) {
            console.log(error);
        }
    }
    static admininsert = async (req, res) => {
        try {
            //console.log(req.files.image)
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "schoolImage"
            })

            const { name, email, password, cpassword, image } = req.body
            const admin = await AdminModel.findOne({ email: email })
            //console.log(admin);
            if (admin) {
                req.flash('error', "Email Already Exists");
                res.redirect('/register')
            } else {
                if (name && email && password & cpassword) {
                    if (password == cpassword) {
                        try {
                            const hashpassword = await bcrypt.hash(password, 10);
                            const result = new AdminModel({
                                name: name,
                                email: email,
                                password: hashpassword,
                                image: {
                                    public_id: image_upload.public_id,
                                    url: image_upload.secure_url
                                }

                            })
                            await result.save()
                            req.flash('success', "Registration SuccessFul! plz Login");
                            res.redirect('/login')

                        } catch (err) {
                            console.log(err);
                        }


                    } else {
                        req.flash('error', "Password && Confirm Password not Match");
                        res.redirect('/register')
                    }

                } else {
                    req.flash('error', "All Fields Required");
                    res.redirect('/register')
                }
            }



        } catch (error) {
            console.log(error);
        }
    }
    static verifylogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const admin = await AdminModel.findOne({ email: email })

                if (admin != null) {
                    const isMatched = await bcrypt.compare(password, admin.password)
                    if (isMatched) {
                        //token
                        const token = jwt.sign({ ID: admin._id }, 'pn123456dkfhdlkfjd2634');
                        //console.log(token);
                        res.cookie("token",token)

                        res.redirect('/admin/dashboard')
                    } else {
                        req.flash('error', 'email or password is not valid')
                        return res.redirect('/login')
                    }
                } else {
                    req.flash('error', 'you are not a registerd user')
                    return res.redirect('/login')

                }
            } else {
                req.flash('error', 'All fields Required')
                return res.redirect('/login')


            }
        } catch (error) {
            console.log(error);

        }
    }
    static logout = async (req, res) => {
        try {
            
           res.clearCookie("token");
           res.redirect('/login')
             

        } catch (err) {
            console.log(err);

        }
    }

}

module.exports = AdminController