const express = require('express');
const path = require('path');
const {getTeachers,createTeacher, getTeacherByName} = require(path.join('..','controllers','teacher.js'));


const router = express.Router();



router.get('/',getTeachers);
router.get('/:name',getTeacherByName);
router.post('/',createTeacher);


module.exports = router;