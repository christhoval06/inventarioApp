/*
 * GET users listing.
 */
var mongodb = require('./mongodb');
var inventariodb = mongodb.inventariodb;

exports.list = function (req, res) {
    res.render('navbar', {});
    /*res.contentType('json');
		res.json({
			success: true,
			usuarios: notas
		});
	*/
};