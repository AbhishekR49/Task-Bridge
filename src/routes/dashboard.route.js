const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {getPosterDashboard, getApplicantDashboard} = require('../controllers/dashboard.controller');

const router = express.Router();


router.get('/poster',authenticate, authorize('poster'), getPosterDashboard);

router.get('/applicant', authenticate, authorize('applicant'), getApplicantDashboard);

module.exports = router;