import express from 'express'
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyResteurantRequest } from '../middleware/validation';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1025 // 5mb
    }
})

router.post(
    "/",  
    upload.single("imageFile"), 
    validateMyResteurantRequest, 
    jwtCheck, 
    jwtParse, 
    MyRestaurantController.createMyRestaurant
);

export default router;
