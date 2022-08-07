const brandModel = require('../models/brands');
const fileModel = require('../models/images');
const {uploadFile} = require('../utils/s3');


exports.home = async (req, res, next) => {

    
        let skip = 0;
        let limit = 50;

        console.log(req.query);

        if (req.query.skip != undefined) {
            skip = parseInt(req.query.skip);
            if (isNaN(skip)) {
                limit = 0;
            }
        }
        if (req.query.limit != undefined) {
            limit = parseInt(req.query.limit);
            if (isNaN(limit)) {
                limit = 10;
            }
        }
        if (req.session.auth) {

            let brandList = await brandModel.find().populate('image').skip(skip).limit(limit).exec();
            
            let list = brandList.map((item) => {
                return {
                    title: item.title,
                    id: item._id.toString().substring(0, 6),
                    idNormal: item._id.toString(),
                    date: item.date.toString().split('GMT')[0],
                    statusBrand : item.is_lock != true ? 'Active' : 'Blocqué',
                    image : "https://cac-e-shop-by-intech.s3.amazonaws.com/"+item.image.filename+"-300.webp",
                    color : item.is_lock != true ? 'green' : 'red',
                }
            });

            
            return res.render('brands', {
                brands: list,
                activeShop: "active",
                activeBrand : "active"
            });
        }

        return res.redirect('/users/login')

}

exports.delete = async (req,res,next) => {
    if (req.session.auth) {

        const brand = await brandModel.findById(req.params.id);


        await brand.delete();

        return res.redirect('/brands');
    }
    return res.redirect('/users/login')

}

exports.add = async (req, res, next) => {

    // console.log(req.session);
    // console.log(req.file);

    if (req.session.auth) {

        const brand = brandModel();

        brand.title = req.body.title;

        const file =  await  uploadFile(req.file);

       const image = fileModel();

       image.filename = file;

       const saveImage = await image.save();

       brand.image = saveImage._id;

        const newBrand = await brand.save();
        

        return res.redirect('/brands');


        
    }

    return res.redirect('/users/login')



}

exports.edit = async (req, res, next) => {

    // console.log(req.session);
    // console.log(req.file);

    if (req.session.auth) {

        const brand = await  brandModel.findById(req.params.id);

        brand.title = req.body.title;

        brand.is_lock = req.body.status == "active" ? false : true;

    //     const file =  await  uploadFile(req.file);

    //    const image = fileModel();

    //    image.filename = file;

    //    const saveImage = await image.save();

    //    brand.image = saveImage._id;

        const newBrand = await brand.save();
        

        return res.redirect('/brands');


        
    }

    return res.redirect('/users/login')



}