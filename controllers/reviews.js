const express =require('express')
const Revv = require('../models/review')
const reviewRouter = express.Router()

//index route

reviewRouter.get('/revv',(req,res) => {
    Revv.find({}, (err,revvs)=>{
    res.render('index.ejs', { revvs })    
    }) })

//new route
reviewRouter.get('/revv/new', (req,res) => {
    res.render('new.ejs')
})

//delete route
reviewRouter.delete('/revv/:id',(req,res)=> {
    res.send('this has been deleted')
})

//update
reviewRouter.put('/revv/:id',(req,res) => {
Revv.findByIdAndUpdate(req.params.id,req.body, { new: true},(err,updated)=> {
    if (err){
        res.send('error')
    } else{
        res.redirect('/revv')
    }
})
})
//create route
reviewRouter.post('/revv', (req,res)=> {
    Revv.create(req.body, (err,posted)=> {
        if (err){
            res.send('error')
        } else{
            res.redirect('/revv')
        }
    })
})
//edit route
reviewRouter.get('/revv/:id/edit',(req,res)=> {
    Revv.findById(req.params.id, (err,item)=> {
        res.render('edit.ejs',{ item })
    })
})
//show route
reviewRouter.get('/revv/:id',(req,res)=> {
    Revv.findById(req.params.id,(err,item)=> {
        res.render('show.ejs',{ item })
    })
})

module.exports = reviewRouter;

//hey this is a test