import { Router } from 'express';
import * as collectionController from '../controllers/collectionController';
import { authProtect } from '../middlewares/authMiddleware';

const router: Router = Router();

// Áp dụng middleware authProtect để đảm bảo chỉ user đã đăng nhập mới được thao tác
router.use(authProtect);

// GET /api/collections - Lấy tất cả bộ thẻ của user
router.get('/', collectionController.getCollections);

// GET /api/collections/:id - Lấy 1 bộ thẻ cùng toàn bộ cards bên trong
router.get('/:id', collectionController.getCollectionById);

// POST /api/collections - Tạo bộ thẻ mới (kèm danh sách cards)
router.post('/', collectionController.createCollection);

// POST /api/collections/:id/cards - Tạo một card mới trong một bộ thẻ
router.post('/:id/cards', collectionController.createCard);

export default router;
