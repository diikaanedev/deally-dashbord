const express =  require('express');

const  { engine  } = require('express-handlebars');

const bodyParser = require("body-parser");

const path = require('path');

const authMiddleware = require('./middlewares/auth');

const sessions = require('express-session');


const db = require('./configs/db');

const fetch = require('node-fetch');

//Routes

const userRoute = require('./routes/users');

const dashbordRoute = require('./routes/dashbord');

const categorieRoute = require('./routes/categories');

const productRoute = require('./routes/products');

// const collectionRoute = require('./routes/collections');

// const sectionsRoute = require('./routes/sections');

// const brandRoute = require('./routes/brands');

// const orderRoute = require('./routes/orders');

// const banniereRoute = require('./routes/banieres');

require('dotenv').config({
    path: './.env'
});


const app = express();



app.use(bodyParser.urlencoded({
    extended:true
}));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/users/assets', express.static(path.join('.', 'assets')));
app.use('/products/assets', express.static(path.join('.', 'assets')));
app.use('/products/:id/:assets', express.static(path.join('.', 'assets')));
app.use('/assets', express.static(path.join('.', 'assets')));
app.use('/uploads', express.static('uploads'));

// app.get('/add-products' , (req , res) => {
// 	res.render('add-product')
// } );

// app.get('/orders' , (req , res) => {
// 	res.render('orders')
// });

// app.get('/order-details' , (req , res) => {
// 	res.render('order-details')
// });

// app.get('/customers' , (req , res) => {
// 	res.render('costumers')
// });

// app.get('/customers-details' , (req , res) => {
// 	res.render('costumer-details')
// });

// app.get('/contacts' , (req , res) => {
// 	res.render('contacts')
// });

// app.get('/events' , (req , res) => {
// 	res.render('events')
// });
// app.get('/events-week' , (req , res) => {
// 	res.render('events-week')
// });
// app.get('/events-day' , (req , res) => {
// 	res.render('events-day')
// });



app.use('/users',userRoute);

app.use('/dashbord', dashbordRoute);

app.use('/categories' , categorieRoute );

app.use('/products' , productRoute);

// app.use('/collections' , collectionRoute);

// app.use('/brands' , brandRoute);

// app.use('/sections' , sectionsRoute);

// app.use('/bannieres' , banniereRoute);

// app.use('/orders' , orderRoute);

app.use('/' , (req ,res) => {
    res.redirect('/users/login')
})

db().then(_ => {
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`Server started on ${port}`);
    });
});