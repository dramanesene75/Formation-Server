const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Datastore = require('nedb');
const dataPath = './database/users.db';

const db = new Datastore({ filename: dataPath, autoload: true });

router.post('/', async (req, res, next) => {
    const temp = await fetch('https://api.jsonbin.io/b/5d1339e6f467d60d75a8c9c6/4', {
        headers: {
            'secret-key': '$2a$10$.w5QIuNUx5d0nTzRIgaHlOepRy9HbdGVWlTD21MUCdnA8j3IPz4MS'
        }
    });
    const data = await temp.json();
    const formattedData = data.reduce((acc, curr) => [...acc, ...curr], []);
    db.insert(formattedData);
    res.status(200).end();
});

module.exports = {
    router,
    db
};
