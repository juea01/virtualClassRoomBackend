const signUserIn = (req,res,next)=>{
    if (req.body && req.body.name) {
        res.status(200).json({success: true});
    } else {
        return next();
    }
}

module.exports = {
    signUserIn
}