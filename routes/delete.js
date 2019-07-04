const express = require('express');
const router = express.Router();
const { db } = require('./init');

router.delete('/:name', (req, res) => {
    const { name } = req.params;

    db.remove({ name }, {}, (err, numRemoved) => {});
    res.send(name + ' deleted');
    res.status(200).end();
});

module.exports = router;
