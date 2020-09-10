import express from 'express';
import { authJWT } from '../middlewares/auth';
import { roomCtrl } from '../controllers/rooms';
const router = express.Router();

router.post('/create', authJWT, roomCtrl.create);
router.post('/join/:roomId', authJWT, roomCtrl.join);
router.delete('/:roomId', authJWT, roomCtrl.deleteRoom);

module.exports = router;
