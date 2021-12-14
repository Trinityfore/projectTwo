const express = require('express');
const mongoose =require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const Revv = require('./models/review')
const methodOverride = require('method-override')
const reviewController = require('./controllers/reviews')


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


//seed route
app.get('/revv/seed',(req,res)=> {
    const data = [
        {
            title: 'useful planner',
            entry: 'I absolutely love this planner, its compact and the design is so professional.',
            business: '@gitOrganized',
            img: 'https://images.unsplash.com/photo-1529651737248-dad5e287768e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2565&q=80',
        },
        {
            title: 'good morning',
            entry: 'i love waking up to this adorable alarm clock.',
            business: '@clocksbytherock',
            img: 'https://images.unsplash.com/photo-1637563843021-cb6648e57e97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
        },
        {
            title: 'sitting pretty',
            entry: 'these chairs are my new favorite statement pieces.',
            business: '@2ndlifevintage',
                        img: 'https://images.unsplash.com/photo-1606513792555-7dc667e49911?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',

        },
        {
            title: 'delicate, verstile',
            entry: 'these crystal vases are to die for, absolutely something ill pass on for generations.',
            business: '@',
            img: 'https://images.unsplash.com/photo-1629745572676-e9e71631a61f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        },
        {
            title:'best candle ever.', 
            entry: 'seriously the best smelling candle ive ever owned.',
            business: '@CCC',
            img:'https://images.unsplash.com/photo-1619799360851-a143fbc240b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',

        },
        {
            title: 'perfect for WFH',
            entry:'bought this during the pandemic and its been my favorite purchase',
            business: '@desks',
            img:'https://images.unsplash.com/photo-1623177578688-ee67cfc19428?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        }
    ]
    Revv.deleteMany({}, (err,deleted) => {
      Revv.create(data, (err,item) => {
         res.redirect('/revv') 
      })  
    })
    
})

app.use('/', reviewController)

//listener
app.listen(PORT, () => {
    console.log('express is listening on ' + PORT)
});