const express = require('express');
const path = require('path');
const {getStudents,createStudent, getStudentByName} = require(path.join('..','controllers','student.js'));


const router = express.Router();



router.get('/',getStudents);
router.get('/:name',getStudentByName);
router.post('/',createStudent);


module.exports = router;