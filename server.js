const express = require("express");
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');

app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/client/static"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');
app.use(flash());


app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


mongoose.connect('mongodb://localhost/UsersDB', { useNewUrlParser: true });
const UserSchema = new mongoose.Schema({
    first_name:  { type: String, required: true, minlength: 3},
    last_name: { type: String, required: true, maxlength: 6 },
    age: { type: Number, min: 1, max: 150 },
    email: { type: String, required: true },
    password: { type: String, required: true},
}, {timestamps: true });

// create an object that contains methods for mongoose to interface with MongoDB
const User = mongoose.model('User', UserSchema);

require ('./server/config/routes.js')(app);