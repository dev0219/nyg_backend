'use strict'

const mongoose = require('mongoose');
const { db_url } = require('./db.config.json');

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex: true
})
    .then((result) => {
        console.log(`Successfully connected to db : ${result.connections[0].name}`);
    })
    .catch((error) => {
        console.error(error.message);
        throw error;
    })

module.exports = mongoose