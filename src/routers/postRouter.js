const { Router } = require('express');
const { validateToken } = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = Router();

router.post('/', validateToken, postController.create);
// router.get('/', validateToken, postController.findAll);

module.exports = router;