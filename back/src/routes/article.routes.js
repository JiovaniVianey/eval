import { Router } from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  deleteArticle
} from '../controllers/article.controller.js';

const router = Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', createArticle);
router.delete('/:id', deleteArticle);

export default router;
