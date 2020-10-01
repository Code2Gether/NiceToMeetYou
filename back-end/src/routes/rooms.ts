import express from 'express';
import { authJWT } from '../middlewares/auth';
import { roomCtrl } from '../controllers/rooms';
const router = express.Router();

router.post('/create', authJWT, roomCtrl.create);
router.get('/:roomId', authJWT, roomCtrl.access);
router.post('/:roomId', authJWT, roomCtrl.join);
router.delete('/:roomId', authJWT, roomCtrl.deleteRoom);

module.exports = router;
