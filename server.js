const express = require("express");
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');

app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

mongoose.connect('mongodb://localhost/UsersDB', { useNewUrlParser: true });


 require ('./server/config/routes.js')(app);