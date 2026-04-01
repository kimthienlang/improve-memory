import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authProtect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authProtect, authController.getMe);
router.get('/test', authProtect, (req, res) => {
    console.log('Test Called');
    res.json({ message: 'Test successful' });
});
export default router;
