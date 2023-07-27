const AboutModel = require('../../models/About')
const cloudinary = require('cloudinary').v2;

//cloudinary setup

 cloudinary.config({ 
     cloud_name: 'dfoy2i7th', 
     api_key: '617898158181495', 
   api_secret: '__7KhA6JElPhysBEQZ4yS0KsC-Y' 
 });

class AboutController{

    static addabout =async(req,res)=>{
        try {
            const{name,image}=req.data1
            const data = await AboutModel.find()
            //console.log(data);
           res.render('admin/about/addabout',{d:data,message:req.flash('success'),n:name,img:image})
        } catch (error) {
            console.log(error);
        }
    }  
    static insertabout =async(req,res)=>{
        try {
           // console.log(req.files.image)
           const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
                folder:"schoolImage"
            })
           // console.log(image_upload);

            const result =new AboutModel({
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
    static viewabout =async(req,res)=>{
        try {
            //console.log(req.params.id);
            const{name,image}=req.data1
            const data = await AboutModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/about/view',{d:data,n:name,img:image})
           
        } catch (error) {
            console.log(error);
        }
    }

    static editabout =async(req,res)=>{
        try {
            //console.log(req.params.id);
            const{name,image}=req.data1
            const data = await AboutModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/about/edit',{d:data,n:name,img:image})
           
        } catch (error) {
            console.log(error);
        }
    }

    static updateabout =async(req,res)=>{
        try {
            // console.log(req.files.image)
             if (req.files){
                const school = await AboutModel.findById(req.params.id)
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
         await AboutModel.findByIdAndUpdate(id,data)
         req.flash('success', 'Update Success')
            res.redirect('/admin/addschool')
            
            
           
        } catch (error) {
            console.log(error);
        }
    }

    static deleteabout =async(req,res)=>{
        try {


            //console.log(req.params.id);
            // delete image code
            const school= await AboutModel.findById(req.params.id)
            const imageid = school.image.public_id
            await cloudinary.uploader.destroy(imageid)
            await AboutModel.findOneAndDelete(req.params.id)
            

            //console.log(data);
            req.flash('success', 'Delete Success')
            res.redirect('/admin/addschool')
           
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports=AboutController
