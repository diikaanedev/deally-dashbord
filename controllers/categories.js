
const categorieModel = require('../models/categorie');

const slugF = require('slug')

const fileModel = require('../models/file');


const { uploadFile } = require('../utils/s3');

exports.home = async (req, res, next) => {

   
        let skip = 0;
        let limit = 50;

        console.log(req.query);

        if (req.query.skip != undefined) {
            skip = parseInt(req.query.skip);
            if (isNaN(skip)) {
                limit = 1;
            }
        }
        if (req.query.limit != undefined) {
            limit = parseInt(req.query.limit);
            if (isNaN(limit)) {
                limit = 10;
            }
        }
        if (req.session.auth) {

            let categoriesList = await categorieModel.find().skip(skip).limit(limit).exec();


            const categoriesListAll = await categorieModel.find().exec();

            let list = categoriesList.map((item) => {
                return {
                    title: item.title,
                    titleFrench: item.tiltleFrench,
                    contries: item.contries,
                    id: item._id.toString().substring(0, 6),
                    idNormal: item._id.toString(),
                    idParent: item.parent == undefined ? "00" : item.parent.toString ,
                    date: item.date.toString().split('GMT')[0],
                    statusCategorie : item.is_lock != true ? 'Active' : 'Blocqué',
                    color :  item.is_lock != true ? 'green' : 'red'
                }
            });

            let listSelect = categoriesListAll.map((item) => {
                return {
                    title: item.title,
                    id: item._id
                }
            });

            listSelect.unshift({
                title : "Selectionnez une Categorie ",
                id:"00"
            });
           

            // console.log(listSelect);


            return res.render('categorie', {
                categories: list,
                listSelect: listSelect,
                activeShop: "active",
                activeCategorie : "active"
            });
        }

        return res.redirect('/users/login');

}

exports.delete = async (req ,res , next )=> {
    if (req.session.auth) {

        const categorie = await categorieModel.findById(req.params.id);


        const newCategorie = await categorie.delete();


        return res.redirect('/categories');
    }
    return res.redirect('/users/login');

}

exports.add = async (req, res, next) => {
    console.log(req.body);

    if (req.session.auth) {

        const categorie = categorieModel();

        categorie.title = req.body.title;
        categorie.tiltleFrench = req.body.tiltleFrench;
        categorie.contries = req.body.contries;
        
        categorie.slug = slugF(req.body.title);

        const file = await uploadFile(req.files[0]);

        const image = fileModel();

        image.url = file;

        const saveImage = await image.save();

        categorie.image = saveImage;


        if (req.body.category != "00") {
            categorie.parent = req.body.category;
            categorie.is_child = true;

        }

        const newCategorie = await categorie.save();


       


        return res.redirect('/categories');


        
    }

    return res.redirect('/users/login')



}

exports.edit  = async (req, res, next) => {
    console.log(req.body);

    if (req.session.auth) {

        const categorie = await  categorieModel.findById(req.params.id);

        console.log(categorie);
        console.log(req.body.parent);

        categorie.title = req.body.title;
        categorie.tiltleFrench = req.body.tiltleFrench;
        categorie.contries = req.body.contries;

        categorie.is_lock = req.body.status == "active" ? false : true;

        if (req.body.parent.toString() != "00") {    
            categorie.parent = req.body.parent;
        }

        const newCategorie = await categorie.save();



        return res.redirect('/categories');


        
    }

    return res.redirect('/users/login')



}