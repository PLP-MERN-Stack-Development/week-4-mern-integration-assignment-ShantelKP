const express = require('express');
const router = express.Router();

const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController');
const { body } = require('express-validator');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required').isMongoId(),
    body('category').notEmpty().withMessage('Category is required').isMongoId(),
  ],
  createPost
);
router.put(
  '/:id',
  [
    body('title').optional().isLength({ max: 100 }),
    body('content').optional(),
    body('author').optional().isMongoId(),
    body('category').optional().isMongoId(),
  ],
  updatePost
);
router.delete('/:id', deletePost);

module.exports = router;
