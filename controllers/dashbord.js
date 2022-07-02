require('dotenv').config();

const fetch = require('node-fetch');


exports.home = async (req, res, next) => {


    if (req.session.auth) {

        return res.render('home', {
            title: 'Shopicam | Dashbord',
            title_page: 'Dashbord',
            active: true,
            helpers: {
                compareStrings(p, q, options) {
                    return (p == q) ? options.fn(this) : options.inverse(this);
                },

            }
        });
    }
    res.redirect('/users/login')
}

exports.signUp = async (req, res, next) => {
    session = req.session;
    n = req.body.username;
    const body = {
        email: req.body.email,
        password: req.body.password
    };
    const response = await fetch(process.env.AUTH_URL + '/nakama/auth', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    const data = await response.json();

    console.log(data);

    const d = Object.assign(data);

    if (d.statusCode == 200) {
        session.usertoken = d.token;
        session.auth = true;
        return res.redirect('/');
    }

    res.send(data)

}

exports.products = async (req, res, next) => {

    if (req.session.auth) {
        // const response = await fetch(process.env.AUTH_URL + '/shops?isNewShop=false', {
        //     method: 'get',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + req.session.userToken,
        //     }
        // });
        // const data = await response.json();
        // const d = Object.assign(data);

        // if (d.statusCode == 200) {
        //     const da = Object.assign(d.data);
        //     let list = da.map((item)=>{
        //         console.log();
        //         return { nameShop : item.nameShop  ,  image : process.env.FILE_URL+item.avatar.url ,  phone : item.phone , id : item._id }
        //     });
        //     return res.render('shops', {
        //         title: 'Shopicam | Dashbord',
        //         title_page: 'Shops',
        //         shops : list
        //     });
        // }

        return res.render('product', {
            title: 'Deally | Dashbord',
            title_page: 'products',
        });

        
    }
    return res.redirect('/users/login')



}

exports.categories = async (req , res , next) => {
    return res.render('categorie', {
        title: 'Deally | Dashbord',
        title_page: 'categorie'
    });
}

exports.orders = async (req , res , next) => {
    return res.render('orders', {
        title: 'Shopicam | Dashbord',
        title_page: 'Orders'
    });
}

exports.customers = async (req , res , next) => {
    return res.render('costumers', {
        title: 'Deally | Dashbord',
        title_page: 'costumers'
    });
}

exports.calendar = async (req , res , next) => {
    if (req.session.auth) {
        return res.render('calendar', {
            title: 'Deally | Dashbord',
            title_page: 'calendar'
        });
    }
    return res.redirect('/users/login');
}

exports.mail = async (req , res , next) => {
    if (req.session.auth) {
        
        return res.render('mail', {
            title: 'Deally | Dashbord',
            title_page: 'mail'
        });

        
    }
    res.redirect('/users/login')
   
}

exports.chat = async (req , res , next) => {
    if (req.session.auth) {
        
        return res.render('chat', {
            title: 'Deally | Dashbord',
            title_page: 'chat'
        });

        
    }
    res.redirect('/users/login')
   
}

exports.contacts = async (req , res , next) => {
    if (req.session.auth) {
        
        return res.render('contacts', {
            title: 'Deally | contacts',
            title_page: 'contacts'
        });

        
    }
    res.redirect('/users/login')
   
}

exports.todo = async (req , res , next) => {
    if (req.session.auth) {
        
        return res.render('todo', {
            title: 'Deally | Todo',
            title_page: 'todo'
        });

        
    }
    res.redirect('/users/login')
   
}

exports.fileManager = async (req , res , next) => {
    if (req.session.auth) {
        
        return res.render('file-manager', {
            title: 'Deally | file-manager',
            title_page: 'file-manager'
        });

        
    }
    res.redirect('/users/login')
   
}