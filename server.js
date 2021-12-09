const express = require('express');
const mongoose =require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const Revv = require('./models/review')
const methodOverride = require('method-override')


//database connection
mongoose.connect(process.env.DATABASE_URL )

const db= mongoose.connection
db.on('error', (err) => console.log(err.message + 'mongo no run'))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

//mount middleware
app.use(express.urlencoded( { extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('public')) //css files, front end js etc

//index route

app.get('/revv',(req,res) => {
    Revv.find({}, (err,revvs)=>{
    res.render('index.ejs', { revvs })    
    })
})

//new route
app.get('/revv/:id', (req,res) => {
    res.render('new.ejs')
})

//delete route
app.delete('/revv/:id',(req,res)=> {
    res.send('this has been deleted')
})

//update
app.put('/revv/:id',(req,res) => {
Revv.findByIdAndUpdate(req.params.id.req.body, { new: true},(err,updated)=> {
    if (err){
        res.send('error')
    } else{
        res.redirect('/revv')
    }
})
})
//create route
app.post('/revv', (req,res)=> {
    Revv.create(req.body, (err,posted)=> {
        if (err){
            res.send('error')
        } else{
            res.redirect('/revv')
        }
    })
})
//edit route
app.get('/revv/:id/edit',(req,res)=> {
    Revv.findById(req.params.id, (err,item)=> {
        res.render('edit.ejs',{ item })
    })
})
//show route
app.get('/revv/:id',(req,res)=> {
    Revv.findById(req.params.id,(err,item)=> {
        res.render('show.ejs',{ item })
    })
})

//listener
app.listen(PORT, () => {
    console.log('express is listening on ' + PORT)
});