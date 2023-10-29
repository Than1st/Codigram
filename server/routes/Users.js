const usersRouter = require('express').Router()
const usersController = require('../controllers/UsersController')
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
usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:id', usersController.detailUsers)
usersRouter.post('/', usersController.registerUsers)
usersRouter.put('/:id', upload.single('image'), usersController.updateUsers)
usersRouter.delete('/:id', usersController.deleteUsers)
usersRouter.post('/login', usersController.loginUsers)
module.exports = usersRouter