const express = require('express');
const router = express.Router();
const { db } = require('./init');

/* GET users listing. */
router.get('/', function(req, res) {
    db.find({}, (err, docs) => {
        res.send(docs);
    });
});

router.get('/:city', function(req, res) {
    const { city } = req.params;
    db.find({ city: city }, (err, docs) => {
        res.send(docs);
    });
});

module.exports = router;
