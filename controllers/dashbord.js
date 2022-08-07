
exports.home = async (req,res , next ) => {
    
    if (req.session.auth) {
       return res.render('home' , {
        activeDashbord : 'active'
       })
    }

    return res.redirect('/users/login')
    

}