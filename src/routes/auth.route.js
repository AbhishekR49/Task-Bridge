const express = require("express");
const { register, login, getMe, refresh, logout } = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post('/register', register );
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;