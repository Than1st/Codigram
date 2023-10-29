const route = require('express').Router()

route.get('/', (req, res, next) => {
    res.json({message: 'welcome'})
})
const usersRouter = require('./Users')
const postsRouter = require('./Posts')
route.use('/users', usersRouter)
route.use('/posts', postsRouter)
module.exports = route