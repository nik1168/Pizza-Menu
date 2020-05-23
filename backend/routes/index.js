const express = require('express');
const router = express.Router();

/**
 * Index route for application
 */
// router.get('/', (req, res, next) => {
//     res.send("API for pizza menu test")
// });

/* GET home page. */
router.get('/', (req, res, next) => {

    res.redirect("/api-docs");
});

module.exports = router;
