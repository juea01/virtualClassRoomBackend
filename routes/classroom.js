const express = require('express');
const path = require('path');
const {getClassrooms,createClassroom, updateRoom, deleteRoom} = require(path.join('..','controllers','classroom.js'));


const router = express.Router();



router.get('/',getClassrooms);
router.post('/',createClassroom);
router.put('/:classRoomId',updateRoom);
router.delete('/:id', deleteRoom);


module.exports = router;