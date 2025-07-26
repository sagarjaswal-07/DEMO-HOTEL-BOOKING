const router = require('express').Router();
const queryController = require('../Server/Query/queryController');
const roomTypeController = require('../Server/RoomType/roomTypeController');
const roomController = require('../Server/Rooms/roomController');
const managerController = require('../Server/Manager/managerController');

//queries
router.get('/query/add',queryController.add)
router.get('/query/getall',queryController.getall)
router.get('/query/getsingle',queryController.getsingle)
//type
router.get('/type/add',roomTypeController.add)
router.get('/type/getall',roomTypeController.getall)
//room
router.get('/room/add',roomController.add)
router.get('/room/getall',roomController.getall)
router.get('/room/getsingle',roomController.getsingle)
//manager
router.get('/manager/register',managerController.register)

module.exports = router ;