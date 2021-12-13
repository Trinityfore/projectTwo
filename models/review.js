const mongoose = require('mongoose');
const Schema = mongoose.Schema

const revSchema = new Schema ({
    title:String,
    entry:String,
    business:String,
    img: String,

});

const Revv = mongoose.model('Revv', revSchema)

module.exports = Revv;