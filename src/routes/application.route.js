const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { uploadResume, validateResume } = require('../middlewares/uploadResume');
const {createApplication, getTaskApplications, updateApplicationStatus} = require('../controllers/application.controller');

const router = express.Router();


router.post('/task/:id', authenticate, authorize('applicant'),
              uploadResume.single('resume'), validateResume, createApplication );

router.get('/task/:id', authenticate, authorize('poster'), getTaskApplications);

router.patch('/:applicationId/status', authenticate, authorize('poster'), updateApplicationStatus);
  
module.exports = router;              