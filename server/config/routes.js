const _users = require('../controllers/users');
module.exports = function (app) {
    
    app.get('/', (req, res) => {
        _users.index(req, res);

    });

    app.post('/newuser', (req, res) => {
        _users.newuser(req, res);
    });
}
