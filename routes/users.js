const express = require('express');
const router = express.Router();
const { db } = require('./init');

/* GET users listing. */
router.get('/', (req, res) => {
    db.find({}, (err, docs) => {
        res.send(docs);
    });
});

router.put('/update', (req, res) => {
    const data = {};
    Object.entries(req.query).map(query => {
        const [key, value] = query;
        !!value && (data[key] = value);
    });

    db.update({}, data, {}, function(err, numReplaced) {});
    res.status(200).end();
});
router.get('/search', (req, res) => {
    const data = {};
    Object.entries(req.query).map(query => {
        const [key, value] = query;
        !!value && (data[key] = { ['$regex']: new RegExp(value, 'i') });
    });
    db.find(data, (err, docs) => {
        res.send(docs);
    });
});

router.get('/:uid', (req, res) => {
    const { uid } = req.params;
    db.find({ _id: uid }, (err, docs) => {
        res.send(docs);
    });
});

router.delete('/delete', (req, res) => {
    const data = {};
    Object.entries(req.query).map(query => {
        const [key, value] = query;
        !!value && (data[key] = { ['$regex']: new RegExp(value, 'i') });
    });
    db.remove(data, {}, (err, numRemoved) => {});
    res.send(name + ' deleted');
    res.status(200).end();
});

module.exports = router;
