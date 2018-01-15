// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, ip, () => console.log(`API running on ${ip}:${port}`));
process.on('uncaughtException', function (err) {
    console.log(err);
}); 
module.exports = app;
