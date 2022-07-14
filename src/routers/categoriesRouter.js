const { Router } = require('express');
const { validateToken } = require('../controllers/authController');
const categoriesController = require('../controllers/categoriesController');

const router = Router();

router.post('/', validateToken, categoriesController.create);
// router.get('/:id', validateToken, userController.findById);
// router.get('/', validateToken, userController.findAll);

module.exports = router;