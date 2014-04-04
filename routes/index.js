/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('login', { login: true});
};

exports.inicio= function (req, res) {
    res.render('navbar', { login: true});
};