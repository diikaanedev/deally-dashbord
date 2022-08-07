
const productModel = require('../models/product');

const orderModel = require('../models/orders');

const orderItemModel = require('../models/order-items');

const categorieModel = require('../models/categories');

const fileModel = require('../models/images');

const {uploadFile} = require('../utils/s3');
const products = require('../models/products');


exports.all = async  (req ,res , next ) => {

    if (req.session.auth) {
     
        // const products =  await productModel.find().populate('categories').populate('images').exec();
       
        // const categoriesListAll = await categorieModel.find().exec();
    
        // let listSelect = categoriesListAll.map((item)=>{
        //     return { title:item.title, id:item._id.toString()  }
        // });
    
    
        // let list = products.map((item)=>{
        //     const category = Object.assign(item['categories']);
        //     console.log();
        //    if(category.length ==0) {
        //        category.push({
        //            title : "pas de categorie"
        //        });
        //    }


         
        //     return { name:item.name.toString().substring(0,40), 
        //         id:item._id.toString().substring(0,6) ,
        //         idNormal : item._id ,  date : "12.04.2022", 
        //         price : item.price , 
        //         category : category[0].title  , 
        //         image : "https://cac-e-shop-by-intech.s3.amazonaws.com/"+item.images[0].filename+"-300.webp",
        //         categories : category.map(it => {return  {title:it.title, id : it._id.toString() };}),
        //         sku : item.sku,
        //         status : item.is_lock != true ? 'Publier' :'Blocqué',
        //         color : item.is_lock != true ? 'green' :'red',
        //         description : item.description ,  }
        // });
    
        res.render('orders' , {
            
            activeShop: "active",
            activeOrder: "active"
        });
       
    } else {
       res.redirect('/users/login'); 
    }
    
}
