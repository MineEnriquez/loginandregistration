module.exports = function (app) {
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

            // user.save()
            //     .then(() => res.redirect('/'))
            //     .catch(err => {
            //         console.log("We have an error!***************", err);
            //         for (var key in err.errors) {
            //             console.log(err.errors[key].message);
            //             req.flash('newUserErrors', err.errors[key].message);
            //         }
            //         res.redirect('/');
            //     });
        });
    }
