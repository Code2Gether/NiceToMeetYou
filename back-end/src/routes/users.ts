import express from 'express';
import { userCtrl } from '../controllers/users';
import { authJWT } from '../middlewares/auth';
const router = express.Router();

//! Public route
router.post('/signup', userCtrl.signUpUser);
router.post('/login', userCtrl.loginUser);

//! Private Route
router.get('/profile', authJWT, userCtrl.userProfile);
router.delete('/profile', authJWT, userCtrl.deleteProfile);
router.put('/profile', authJWT, userCtrl.updateProfile);

module.exports = router;
