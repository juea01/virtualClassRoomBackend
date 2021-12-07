const express = require('express');
const path = require('path');
const {getStudentClassrooms,createStudentClassroom,updateStudentClassroom} = require(path.join('..','controllers','studentclassroom.js'));


const router = express.Router();



router.get('/',getStudentClassrooms);
router.post('/',createStudentClassroom);
router.put('/:studentClassRoomId',updateStudentClassroom);


module.exports = router;