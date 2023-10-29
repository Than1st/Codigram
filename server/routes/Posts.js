const postsRouter = require('express').Router()
const postsController = require('../controllers/PostsController')
const multer = require('multer')
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads")
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})
postsRouter.get('/', postsController.getPosts)
postsRouter.get('/:id', postsController.detailPosts)
postsRouter.post('/users/:id', postsController.usersPosts)
postsRouter.post('/', upload.single('image'), postsController.createPosts)
postsRouter.put('/:id', upload.single('image'), postsController.updatePosts)
postsRouter.delete('/:id', postsController.deletePosts)
postsRouter.post('/search', postsController.searchPosts)
module.exports = postsRouter