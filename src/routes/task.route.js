const express = require('express');
const {authenticate, authorize} = require('../middlewares/auth.middleware');
const { createTask, getTasks, getTaskById, updateTask } = require('../controllers/task.controller');

const router = express.Router();

router.post('/', authenticate, authorize('poster'), createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.patch('/:id', authenticate, authorize('poster'), updateTask);

module.exports = router; 