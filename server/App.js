require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./routes')
const AuthMiddleware = require('./middlewares/AuthMiddleware')
const path = require("path");

const app = express()
const port = process.env.PORT || 3001
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(AuthMiddleware)
app.use(route)
app.listen(port, ()=>{
    console.log(`App listen port ${port}`)
    console.log(`http://localhost:${port}`)
})