
const banniereModel = require('../models/baniere-front');


const fileModel = require('../models/images');

const { uploadFile } = require('../utils/s3');

exports.all = async (req, res, next) => {

    if (req.session.auth) {

        const banniers = await banniereModel.find().populate('image').exec();

        let listBanniere = banniers.map(item => {
            return {
                url: item.urlRedirect,
                id: item._id,
                position: item.position,
                image: "https://cac-e-shop-by-intech.s3.amazonaws.com/" + item.image.filename + "-300.webp",
            }
        });

        return res.render('bannieres', {
            bannieres: listBanniere,
            activeBanniere:"active"
        })
    }
    res.redirect('/users/login');
}

exports.one = async (req, res, next) => {
    return res.render('section-front')

}

exports.update = async (req, res, next) => {

    // console.log(req.body);

    console.log("req.files");
    console.log(req.files);


    const banniere = await banniereModel.findById(req.params.id);
    if (req.files.length > 0) {
        const file = await uploadFile(req.files[0]);

        const image = fileModel();

        image.filename = file;

        const saveImage = await image.save();


        banniere.image = saveImage._id;
    }

    banniere.urlRedirect = req.body.urlRedirect;


    if (req.body.position != 'main') {
        banniere.position = 2;
    }

    const newBanniere = await banniere.save();

    console.log(newBanniere)



    return res.redirect('/bannieres')

}
exports.add = async (req, res, next) => {

    console.log(req.body);

    const banniere = banniereModel();

    const file = await uploadFile(req.files[0]);

    const image = fileModel();

    image.filename = file;

    const saveImage = await image.save();

    banniere.urlRedirect = req.body.urlRedirect;

    banniere.image = saveImage._id;

    if (req.body.position != 'main') {
        banniere.position = 2;
    }

    const newBanniere = await banniere.save();

    console.log(newBanniere)



    return res.redirect('/bannieres')

}


exports.delete = async (req, res, next) => {
    if (req.session.id) {

        const banniere = await banniereModel.findById(req.params.id).exec();

        await banniere.delete();

        return res.redirect('/bannieres');
    }
    res.redirect('/users/login');

}