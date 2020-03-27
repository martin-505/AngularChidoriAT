let express = require('express');
let router = express.Router();
let User = require("../models/users");
/* GET users listing. */
router.get('/', function(req, res) {
    User.find().exec((error, users) => {
        if (!error) {
            res.status(200).json(users);
            console.log(users);
        } else {
            res.status(500).json(error);
        }
    });
});

module.exports = router;