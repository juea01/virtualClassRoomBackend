const express = require('express');
const path = require('path');
const {signUserIn} = require(path.join('..','controllers','login.js'));


const router = express.Router();




router.post('/',signUserIn);


module.exports = router;