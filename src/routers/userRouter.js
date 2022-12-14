const { Router } = require('express');
const { validateToken } = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = Router();

router.post('/', userController.create);
router.get('/:id', validateToken, userController.findById);
router.get('/', validateToken, userController.findAll);
router.delete('/:me', validateToken, userController.deleteMe);

module.exports = router;