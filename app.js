const express =  require('express');
const  { engine  } = require('express-handlebars');
const bodyParser = require("body-parser");
const path = require('path');
const authMiddleware = require('./middlewares/auth');
const sessions = require('express-session');


//Routes

const userRoute = require('./routes/user');

const dashbordRoute = require('./routes/dashbord');

// const categorieRoute = require('./routes/categories');

// const productRoute = require('./routes/products');

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
app.use('/dashbord/assets', express.static(path.join('.', 'assets')));
app.use('/dashbord/assets', express.static(path.join('.', 'assets')));
app.use('/dashbord/assets', express.static(path.join('.', 'assets')));
app.use('/dashbord/assets', express.static(path.join('.', 'assets')));
app.use('/dashbord/assets', express.static(path.join('.', 'assets')));
app.use('/users/assets', express.static(path.join('.', 'assets')));
app.use('/assets', express.static(path.join('.', 'assets')));





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
app.use('/' , (req ,res , next ) => {
    if (req.session.auth) {
        return res.redirect('/dashbord')
    }
    res.redirect('/users/login')
})

// app.use('/categories' , categorieRoute );
// app.use('/products' , productRoute);
const port = process.env.PORT

app.listen(port, () => {
	console.log(`Server started on 6550 `);
});

