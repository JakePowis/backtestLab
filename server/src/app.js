const express = require('express');
const mongoose = require('mongoose');

//set app
const app = express();

//set port
app.set('port', process.env.PORT || 4000);


//middleware
app.use(express.json());


//connect to local db, move to .env at some point
const db = ""


// Connect to Mongo
mongoose
    .connect('mongodb://localhost:27017/backtester', { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.use('/history', require('./routes/historyRoute'));




module.exports = app;