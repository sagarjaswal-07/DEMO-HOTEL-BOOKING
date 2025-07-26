const router = require('express').Router();
const queryController = require('../Server/Query/queryController');
const roomTypeController = require('../Server/RoomType/roomTypeController');
const roomController = require('../Server/Rooms/roomController');

//queries
router.post('/query/add',queryController.add)
router.post('/query/getall',queryController.getall)
router.post('/query/getsingle',queryController.getsingle)
//type
router.post('/type/add',roomTypeController.add)
router.post('/type/getall',roomTypeController.getall)

//room
router.post('/room/add',roomController.add)
router.post('/room/getall',roomController.getall)
router.post('/room/getsingle',roomController.getsingle)

module.exports = router ;