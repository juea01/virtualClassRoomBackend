const authorize = (req, res, next ) =>{
    console.log('authorize');
    const {user} = req.query;
    if(user === 'John') {
        req.user = {name: 'john', id:3};
        next();
    } else {
        res.status(401).send('Unauthorize Access');
    }
};

module.exports = authorize;