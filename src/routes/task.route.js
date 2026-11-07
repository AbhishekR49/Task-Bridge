const express = require('express');
const {authenticate, authorize} = require('../middlewares/auth.middleware');
const { createTask, getTasks, getTaskById, updateTask, closeTask, getMyTasks, completeTask } = require('../controllers/task.controller');

const router = express.Router();

router.post('/', authenticate, authorize('poster'), createTask);
router.get('/', getTasks);
router.get('/my-tasks', authenticate, authorize('poster'), getMyTasks);
router.get('/:id', getTaskById);
router.patch('/:id/close', authenticate, authorize('poster'), closeTask);
router.patch(
  '/:id/complete',
  authenticate,
  authorize('poster'),
  completeTask
);
router.patch('/:id', authenticate, authorize('poster'), updateTask);

module.exports = router; 