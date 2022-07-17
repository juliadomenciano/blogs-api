const { Router } = require('express');
const { validateToken } = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = Router();

router.get('/search', validateToken, postController.searchPost);
router.post('/', validateToken, postController.create);
router.get('/:id', validateToken, postController.findPostById);
router.get('/', validateToken, postController.getPosts);
router.get('/', validateToken, postController.getPosts);

router.put('/:id', validateToken, postController.updatePost);
router.delete('/:id', validateToken, postController.deletePost);

module.exports = router;