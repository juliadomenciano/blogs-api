const { Router } = require('express');
const { validateToken } = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = Router();

router.post('/', userController.create);
router.get('/', validateToken, userController.findAll);

module.exports = router;