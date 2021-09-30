const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
