import { Router } from "express";
import { createPost, getPosts, updatePost } from "../controllers/post_controller.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/').get(getPosts);
router.route('/update/:id').put(updatePost);

export default router;