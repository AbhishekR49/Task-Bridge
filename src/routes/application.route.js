const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const { uploadResume, validateResume } = require('../middlewares/uploadResume');
const createApplication = require('../controllers/application.controller');

const router = express.Router();


router.post('/task/:id', authenticate, authorize('applicant'),
              uploadResume.single('resume'), validateResume, createApplication );

  
module.exports = router;              