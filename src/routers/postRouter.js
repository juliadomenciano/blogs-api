const { Router } = require('express');
const { validateToken } = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = Router();

router.post('/', validateToken, postController.create);
router.get('/:id', validateToken, postController.findPostById);
router.get('/', validateToken, postController.getPosts);
router.get('/', validateToken, postController.getPosts);
router.put('/:id', validateToken, postController.updatePost);

module.exports = router;