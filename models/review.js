const mongoose = require('mongoose');
const Schema = mongoose.Schema

const revSchema = new Schema ({
    title:String,
    entry:String,
    business:String,
    // img: { data: Buffer, contentType: String } ??? ask about this!
});