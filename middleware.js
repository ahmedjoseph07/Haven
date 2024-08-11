module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Login to create a new listing ");
        return res.redirect('/login');
    }
    next()
}