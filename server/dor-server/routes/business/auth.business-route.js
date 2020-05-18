const express = require('express');
const router = express.Router();

const { register } = require('../../controller/business/auth.business-controller');
const { businessSignupValidator } = require('../../validator/validator');

router.post('/register', businessSignupValidator, register);

module.exports = router;