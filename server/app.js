const express = require("express")
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI}= require('./keys')
console.log(MONGOURI)

const customMiddleware = (req,res,next)=>{
    console.log("middleware executed!!")
    next()
}
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting mongodb",err)
})

require('./models/user')
require('./models/post')
require('./models/message')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.use(require('./routes/message'))


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})