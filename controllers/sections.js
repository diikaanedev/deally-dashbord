
const sectionModel = require('../models/section-front');

const sectonObjectModel = require('../models/sections-front-object');

const categorieModel = require('../models/categories');

const fileModel = require('../models/images');

const { uploadFile } = require('../utils/s3');

exports.all = async (req, res, next) => {

    if (req.session.auth) {
        const categoriesListAll = await categorieModel.find().exec();

        const sectionList = await sectionModel.find().exec();

        let listSection = sectionList.map(item => {
            return {
                title: item.titre,
                id: item._id,
                description: item.description,
                status : item.status
            }
        });

        let listSelect = categoriesListAll.map((item) => {
            return {
                title: item.title,
                id: item._id
            }
        });

        return res.render('section-front', {
            categories: listSelect,
            sections: listSection,
            activeSection :"active"
        })
    }
    res.redirect('/users/login');
}

exports.one = async (req, res, next) => {
    return res.render('section-front')

}

exports.update = async (req, res, next) => {
    return res.render('section-front')

}
exports.add = async (req, res, next) => {

    const section = sectionModel();

    section.titre = req.body.titreSection;

    section.category = req.body.categories;

    

    //Add product section here

    section.description = req.body.descriptionSection;

    const newSection = await section.save();



    // if (Array.isArray(req.body.categories)) {
    //     let i = 0;
    //     let sectionsId = [];
    //     for (const iterator of req.body.categories) {
    //         if (i == 0) {


    //         }else  {
    //             const categorie = categorieModel.findById(iterator).exec();
    //             const section = sectionModel();

    //             section.titre = categorie.title;

    //             //Add product section here

    //             section.desciption = req.body.descriptionSection;

    //             const newSection = await section.save();

    //             sectionsId.push(newSection._id)
    //         }
    //         i++;
    //     }
    //     const sectionObject = sectonObjectModel();

    //     sectionObject.titre = req.body.titreSection;
    //     sectionObject.content = sectionsId;

    //     sectionObject.description = req.body.descriptionSection;

    //     const newSectionOject = await sectionObject.save();

    // } else {
    //     const section = sectionModel();

    //     section.titre = req.body.titreSection;

    //     section.desciption = req.body.descriptionSection;

    //     section.category = req.body.categories;

    //     section.typeSection = 2;

    //     // const file = await uploadFile(req.files[0]);

    //     // const image = fileModel();

    //     // image.filename = file;

    //     // const saveImage = await image.save();

    //     // section.image = saveImage._id;

    //     const newSection = await section.save();

    //     const sectionObject = sectonObjectModel();

    //     sectionObject.titre = req.body.titreSection;

    //     sectionObject.description = req.body.descriptionSection;

    //     sectionObject.content = [newSection._id];

    //     const newSectionOject = await sectionObject.save();


    // }

    return res.redirect('/sections')

}

exports.edit = async (req , res , next ) => {
    console.log(req.body);
    if (req.session.auth) {
        const section = await sectionModel.findById(req.params.id).exec();

        console.log(section);

        section.titre = req.body.titreSection;

        section.description = req.body.descriptionSection;

        const updateSection = await section.save();

        return res.redirect('/sections');
    }
    res.redirect('/users/login');

}


exports.delete = async (req, res, next) => {
    console.log(req.body);
    console.log(req.params);
    if (req.session.id) {

        const section = await sectionModel.findById(req.params.id).exec();

        await section.delete();

        return res.redirect('/sections');
    }
    res.redirect('/users/login');

}