const express = require('express');
const path = require('path');
const {getStudentClassrooms,createStudentClassroom} = require(path.join('..','controllers','studentclassroom.js'));


const router = express.Router();



router.get('/',getStudentClassrooms);
router.post('/',createStudentClassroom);


module.exports = router;