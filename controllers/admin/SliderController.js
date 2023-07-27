const SliderModel = require('../../models/Slider')
const cloudinary = require('cloudinary').v2;

//cloudinary setup
cloudinary.config({
    cloud_name: 'dfoy2i7th',
    api_key: '617898158181495',
    api_secret: '__7KhA6JElPhysBEQZ4yS0KsC-Y'
});

class SliderController {

    static addslider = async (req, res) => {
        try {
            //res.send('hello')
            const{name,image}=req.data1
            const data = await SliderModel.find()
            //console.log(data);
            res.render('admin/slider/addslider', { d: data,message:req.flash('success'),n:name,img:image })
        } catch (error) {
            console.log(error);
        }
    }
    static insertslider = async (req, res) => {
        try {
            //console.log(req.files.image)
            const imagefile = req.files.image
            //image upload code
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "schoolImage"
            })
            //console.log(image_upload);

            const result = new SliderModel({
                tittle: req.body.tittle,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
                }

            })
            await result.save()
            res.redirect('/admin/addslider')
        } catch (error) {
            console.log(error);
        }
    }


    static viewslider = async (req, res) => {
        try {
            //console.log(req.params.id);
            const{name,image}=req.data1
            const data = await SliderModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/slider/view', { d: data ,n:name,img:image})

        } catch (error) {
            console.log(error);
        }
    }
    static editslider = async (req, res) => {
        try {
            //console.log(req.params.id);
            const{name,image}=req.data1
            const data = await SliderModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/slider/edit', { d: data,n:name,img:image })

        } catch (error) {
            console.log(error);
        }
    }

    static updateslider = async (req, res) => {
        try {
            // console.log(req.files.image)
            if (req.files) {
                const slider = await SliderModel.findById(req.params.id)
                const imageid = slider.image.public_id

                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)

                //second update image
                const imagefile = req.files.image

                const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                    folder: "schoolImage"
                })

                var data = {
                    name: req.body.name,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url
                    }

                }
            } else {
                var data = {
                    name: req.body.name,
                }

            }
            //console.log(req.params.id);
            const id = req.params.id
            await SliderModel.findByIdAndUpdate(id, data)
            req.flash('success', 'Update Success')
            res.redirect('/admin/addslider')



        } catch (error) {
            console.log(error);
        }
    }

    static deleteslider = async (req, res) => {
        try {


            //console.log(req.params.id);
            // delete image code
            const slider = await SliderModel.findById(req.params.id)
            const imageid = slider.image.public_id
            await cloudinary.uploader.destroy(imageid)

            await SliderModel.findOneAndDelete(req.params.id)


            //console.log(data);
            req.flash('success', 'Delete Success')
            res.redirect('/admin/addslider')

        } catch (error) {
            console.log(error);
        }
    }


}
module.exports = SliderController