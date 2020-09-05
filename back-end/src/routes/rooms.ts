import express from 'express';
import { authJWT } from '../middlewares/auth';
import { roomCtrl } from '../controllers/rooms';
const router = express.Router();

router.get('/create', authJWT, roomCtrl.create);
router.get('/join/:roomId', authJWT, roomCtrl.join);

module.exports = router;
