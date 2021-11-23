'use strict'

// Importing libraries
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
// const { v4: uuidv4 } = require('uuid');

// Importing API
const api_v1 = require('./apis/api_v1');

// Using Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static('build'))



// Using APIs.
app.use('/api_v1', api_v1)

app.get('/*', (req, res) => {
    // const userId = uuidv4()
    return res.sendFile(path.join(__dirname, "build", "index.html"))
    // return res.status(200).json({
    //     status: true,
    //     message: "Server started...",
    // })
})

// getting PORT and HOSTNAME
const PORT = process.env.PORT || 8000
const HOSTNAME = process.env.HOSTNAME || `localhost`

app.listen(PORT, HOSTNAME, (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log(`Server running on http://${HOSTNAME}:${PORT}`);
    }
})

module.exports = app