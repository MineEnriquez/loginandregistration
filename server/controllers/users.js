const mongoose = require('mongoose');
const MongModels = require('../models/user');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const User = MongModels.User

module.exports = {
    index: function (req, res){
        res.render('Registration');
    },

   newuser: function (req, res){
        _newuser = req.body;
        if(_newuser.password === _newuser.confirm){
            console.log(_newuser.password);

            bcrypt.hash(_newuser.password, 10)
            .then(hashed_password => {
                console.log(hashed_password);   
                user = new User(_newuser);
                user.password = hashed_password;
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

            })
            .catch(error => {
                 console.log("error generating hashed password");
                 console.log("We have an error!***************", err);
                        for (var key in err.errors) {
                            console.log(err.errors[key].message);
                            req.flash('newUserErrors', err.errors[key].message);
                        }
                        res.redirect('/');
            });
        }
        else{
            console.log("passowrds ndo not match");

        }
    }
}