const express = require('express');
const mongoose =require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const methodOverride = require('method-override')


//database connection
mongoose.connect(process.env.DATABASE_URL )

const db= mongoose.connection
db.on('error', (err) => console.log(err.message + 'mongo no run'))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

app.use(express.urlencoded( { extended: false}))
app.use(methodOverride('_method'))

//index route

app.get('/revv',(req,res) => {
    res.send('here is a home page')
})

//new route

app.get('/revv/:id', (req,res) => {
    res.send('here is a new review')
})

//delete route
app.delete('/revv/:id',(req,res)=> {
    res.send('this has been deleted')
})

//update
app.put('/revv/:id',(req,res) => {

})
//create route

//edit route

//show route

//listener
app.listen(PORT, () => {
    console.log('express is listening on ' + PORT)
});