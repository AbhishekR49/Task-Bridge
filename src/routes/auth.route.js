const express = require("express");
const { register, login, getMe, refresh, logout } = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validateOrigin = require("../middlewares/csrf.middleware");

const router = express.Router();

router.post('/register', register );
router.post('/login', validateOrigin, login);
router.get('/me', authenticate, getMe);
router.post('/refresh', validateOrigin, refresh);
router.post('/logout', validateOrigin, logout);

module.exports = router;