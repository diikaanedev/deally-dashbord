
const productModel = require('../models/product');

const categorieModel = require('../models/categorie');

const fileModel = require('../models/file');

const { uploadFile } = require('../utils/s3');


exports.all = async (req, res, next) => {

    if (req.session.auth) {

        const products = await productModel.find().populate('categories').populate('images').exec();

        const categoriesListAll = await categorieModel.find().exec();

        let listSelect = categoriesListAll.map((item) => {
            return { title: item.title, id: item._id.toString() }
        });


        let list = products.map((item) => {
            const category = Object.assign(item['categories']);
            console.log();
            if (category.length == 0) {
                category.push({
                    title: "pas de categorie"
                });
            }



            return {
                name: item.name.toString().substring(0, 40),
                id: item._id.toString().substring(0, 6),
                idNormal: item._id, date: "12.04.2022",
                price: item.price,
                category: category[0].title,
                image: "https://cac-e-shop-by-intech.s3.amazonaws.com/" + item.images[0].filename + "-300.webp",
                categories: category.map(it => { return { title: it.title, id: it._id.toString() }; }),
                sku: item.sku,
                status: item.is_lock != true ? 'Publier' : 'Blocqué',
                color: item.is_lock != true ? 'green' : 'red',
                description: item.description,
            }
        });

        res.render('product', {
            products: list,
            categories: listSelect,
            activeShop: "active",
            activeProduct: "active"

        });

    } else {
        res.redirect('/users/login');
    }

}




exports.one = async (req, res, next) => {
    if (req.session.auth) {
        const product = await productModel.findById(req.params.id).populate('categories images').exec();

        const cats = product.categories.map(e => {
            return { title: e.title, id: e._id.toString() }
        });

        const tags = product.tags.map(e => {
            return { title: e.title, id: e._id.toString() }
        });


        res.render('show-product', {
            product: { name: product.name.toString().substring(0, 40), id: product._id.toString().substring(0, 6), idNormal: product._id, date: product.date, price: product.price, image: product.images[0].filename, sku: product.sku },
            categories: cats,
            tags: tags
        });
    } else {
        res.redirect('/users/login');
    }
}

exports.store = async (req, res, next) => {

    const product = productModel();

    const images = [];

    console.log(req.body)

    for await (const variable of req.files) {

        const file = await uploadFile(variable);

        const image = fileModel();

        image.filename = file;

        const saveImage = await image.save();

        images.push(saveImage._id);

    }

    product.name = req.body.name;
    product.sku = req.body.sku;
    product.images = images;
    product.variations = [];
    product.specifications = [];
    product.categories = req.body.categories;
    product.brands = [];
    product.collections = [];
    product.tags = [];
    product.description = req.body.description;
    product.short_description = req.body.description;
    product.price = req.body.price;

    const saveProduct = await product.save();

    return res.redirect('/products')
}

exports.edit = async (req, res, next) => {

    const product = await productModel.findById(req.params.id);

    const images = [];

    console.log(req.body)


    product.name = req.body.name;
    product.sku = req.body.sku;
    //   product.images  =  images;
    product.variations = [];
    product.specifications = [];
    product.categories = req.body.categories;
    product.brands = [];
    product.collections = [];
    product.tags = [];
    product.description = req.body.description;
    product.short_description = req.body.description;
    product.price = req.body.price;
    product.is_lock = req.body.status == "active" ? false : true;


    const saveProduct = await product.save();

    return res.redirect('/products')
}

exports.delete = async (req, res, next) => {

    if (req.session.auth) {
        const product = await productModel.findById(req.params.id).exec();
        await product.delete();
        res.redirect('/products')
    }
    res.redirect('/users/login');

}