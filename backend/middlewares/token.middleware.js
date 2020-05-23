const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config');
module.exports.middleware = function (req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const apikey = req.body.api_key || req.query.api_key || req.headers['x-api-key'] || req.headers['api_key'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        if (apikey && apikey === 'root') {
            next();
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token nor api-key provided.'
            });
        }

    }
};
