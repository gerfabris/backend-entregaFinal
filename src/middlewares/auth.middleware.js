export const checkAuth = (req,res,next) =>{
    if(req.isAuthenticated()){
        next()
    }else{
        console.log('no autenticado por middlware auth');
        res.redirect('/')
    }
}
