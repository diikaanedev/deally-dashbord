
module.exports = async ( req , res , next ) => {


    if(req.session.auth) {
        res.redirect('/dashbord')
    }

    res.redirect('/users/login');
    next()

}

