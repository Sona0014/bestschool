const CategoryModel = require('../../models/Category')
const cloudinary = require('cloudinary').v2;

//cloudinary setup
cloudinary.config({ 
    cloud_name: 'dfoy2i7th', 
    api_key: '617898158181495', 
    api_secret: '__7KhA6JElPhysBEQZ4yS0KsC-Y' 
});

class CategoryController{

    static addcategory =async(req,res)=>{
        try {
            const{name,image}=req.data1
            const data = await CategoryModel.find()
            //console.log(data);
           res.render('admin/category/addcategory',{d:data,message:req.flash('success'),n:name,img:image})
        } catch (error) {
            console.log(error);
        }
    } 
    static insertcategory =async(req,res)=>{
        try {
            // console.log(req.files.image);
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
                folder:"schoolImage"
            })
            //console.log(image_upload);
            //console.log(req.files.image);
            const result =new CategoryModel({
                name:req.body.name,
                des:req.body.des,
                image: {
                   public_id: image_upload.public_id,
                   url: image_upload.secure_url
                }


             })
             await result.save()
             res.redirect('/admin/addabout')
        } catch (error) {
            console.log(error);
        }
    }
    static viewcategory =async(req,res)=>{
        try {
            //console.log(req.params.id);
            const{name,image}=req.data1
            const data = await CategoryModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/category/view',{d:data,n:name,img:image})
           
        } catch (error) {
            console.log(error);
        }
    }

    static editcategory =async(req,res)=>{
        try {
            //console.log(req.params.id);
            const{name,image}=req.data1
            const data = await CategoryModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/category/edit',{d:data,n:name,img:image})
           
        } catch (error) {
            console.log(error);
        }
    }

    static updatecategory =async(req,res)=>{
        try {
            // console.log(req.files.image)
             if (req.files){
                const school = await CategoryModel.findById(req.params.id)
                const imageid = school.image.public_id

               // console.log(imageid)
               await cloudinary.uploader.destroy(imageid)

               //second update image
               const imagefile = req.files.image
    
               const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
                folder:"schoolImage"
            })

            var data = {
                name:req.body.name,
                des:req.body.des,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
            }

            }
            }else{ 
                var data = {
                    name:req.body.name,
                    des:req.body.des, 
                }

            }
            //console.log(req.params.id);
            const id =req.params.id
         await CategoryModel.findByIdAndUpdate(id,data)
         req.flash('success', 'Update Success')
         res.redirect('/admin/addschool')
            
            
           
        } catch (error) {
            console.log(error);
        }
    }

    static deletecategory =async(req,res)=>{
        try {


            //console.log(req.params.id);
            // delete image code
            const school= await CategoryModel.findById(req.params.id)
            const imageid = school.image.public_id
            await cloudinary.uploader.destroy(imageid)
            await CategoryModel.findOneAndDelete(req.params.id)
            

            //console.log(data);
            req.flash('success', 'Delete Success')
            res.redirect('/admin/addschool')
           
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports=CategoryController