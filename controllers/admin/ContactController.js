const ContactModel = require("../../models/contact");

class ContactController{

    static addcontact = async(req,res)=>{
        try{
            const{name,image}=req.data1
           // res.render('admin/contact/addcontact')
            const data = await ContactModel.find()
            console.log(data);
            res.render('admin/contact/addcontact',{d:data,n:name,img:image})
        }catch (error) {
            console.log(error)
        }
    }

    static insertcontact = async(req,res)=>{
        try{            
           
          const result = new ContactModel({
            name:req.body.name,
            email:req.body.email,
               description:req.body.description
          })
          
        await result.save()
        res.redirect('/admin/addcontact')

        }catch (error) {
            console.log(error);
        }
    }
    static viewcontact =async(req,res)=>{
        try{
            const{name,image}=req.data1
           const data = await ContactModel.findById(req.params.id)
           res.render('admin/contact/view',{d:data,n:name,img:image})
        }catch (error) {
            console.log(error);
        }
    }
    static editcontact =async(req,res)=>{
        try{
            const{name,image}=req.data1
           const data = await ContactModel.findById(req.params.id)
           res.render('admin/contact/edit',{d:data,n:name,img:image})
        }catch (error) {
            console.log(error);
        }
    }
    static updatecontact = async (req, res) => {
        try {
            const id =req.params.id
            const data = await ContactModel.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                description:req.body.description

                
            })
            res.redirect('/admin/addcontact')



        } catch (erroe) {
            console.log(error)
        }

    }
    static deletecontact =async(req,res)=>{
        try{
            const id = req.params.id
           const data = await ContactModel.findByIdAndDelete(id)
           res.redirect('/admin/addcontact')
          
        }catch (error) {
            console.log(error);
        }
    }


    





}
module.exports=ContactController