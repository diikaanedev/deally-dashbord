const session = require('express-session');

session({
    secret: 'cac-dashbord',
    resave: true,
    saveUninitialized: true
});

module.exports = session ;