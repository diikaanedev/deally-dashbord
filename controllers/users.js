const userModel = require('../models/auth');
const bcrytjs = require('bcryptjs');


exports.login = async (req, res ,next ) => {
    if (req.session.auth) {
       return  res.redirect('/dashbord');
    }
    res.render('login' , {
		layout :'login',
	});
}

exports.register = async (req, res , next ) => {

    if (req.session.auth) {

        const users = await userModel.find(req.query).exec();

        console.log(users);

        let list = users.map((item) => {
            return {
                username: item.username,
                email: item.email,
                id: item._id.toString().substring(0, 6),
                idNormal: item._id.toString(),
                date: item.date.toString().split('GMT')[0],
                role : item.role != "1" ? 'admin' : 'agent',
                status : item.status=='active' ? 'Active':'Bloquer',
                color : item.status =='active' ? 'green':'red'
            }
        });
        
       return  res.render('users' ,{
         users : list,
         activeUser : 'active'
       });
        
    }
    res.redirect('/users/login')


}

exports.password = async (req,res ,next) => {
    res.render('password-recouver' , {});
}

exports.postLogin = async (req ,res , next ) => { 
	session=req.session;
    const user = await userModel.findOne({
        email : req.body.email
    }).exec();

    if (user) {
        if(bcrytjs.compareSync(req.body.password, user.password)) {
            
            session.auth = true;
            
            req.session = session;

            return  res.redirect('/dashbord');

          }else {
            return res.redirect('/users/login');
          }
    }

    res.redirect('/users/login')
}

exports.postRegister = async (req,res,next ) => {
    console.log(req.body);
    const user =  userModel();

    user.email = req.body.email;

    user.username = req.body.nom;

    const newUser = user.save();

    // console.log(newUser);

    return  res.redirect('/users/register');

}

exports.postRegisterEdit = async (req,res,next ) => {

    console.log(req.body);
    const user = await userModel.findById(req.params.id).exec();

    user.email = req.body.email;

    user.username = req.body.nom;
    user.status = req.body.status;

    const newUser = await  user.save();

    console.log("newUser");
    console.log(newUser);

    return  res.redirect('/users/register');

}

exports.deleteRegisterEdit = async (req,res,next ) => {

    // console.log(req.params.id);

    // return res.send('gfefgg')
    const user = await userModel.findById(req.params.id).exec();

    const newUser = await  user.delete();

    console.log("newUser");
    console.log(newUser);

    return  res.redirect('/users/register');

}

exports.postPassword = (req,res,next ) => {

}