const express = require('express');
const path = require('path');
const {getClassrooms,createClassroom} = require(path.join('..','controllers','classroom.js'));


const router = express.Router();



router.get('/',getClassrooms);
router.post('/',createClassroom);


module.exports = router;