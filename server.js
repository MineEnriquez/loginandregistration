const express = require("express");
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');

app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
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

app.get('/', (req, res) => {
    res.render('Login');
});

app.post('/newuser', (req, res) => {
    // const user = new User(req.body);
    const user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.age = req.body.age;
    user.email = req.body.email;

    //TODO - validate passwords match
    
    user.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log("We have an error!***************", err);
            for (var key in err.errors) {
                console.log(err.errors[key].message);
                req.flash('newUserErrors', err.errors[key].message);
            }
            res.redirect('/');
        });
});
