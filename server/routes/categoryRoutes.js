const express = require('express');
const router = express.Router();

const { getCategories, createCategory } = require('../controllers/categoryController');
const { body } = require('express-validator');

router.get('/', getCategories);
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Category name is required').isLength({ max: 50 }),
    body('description').optional().isLength({ max: 200 }),
  ],
  createCategory
);

module.exports = router;
