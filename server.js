'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/').get(function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Only include testing routes in development
if (process.env.NODE_ENV !== 'production') {
  fccTestingRoutes(app);
}

// Always include API routes
apiRoutes(app);

app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// For development and testing
if (process.env.NODE_ENV !== 'production') {
  const runner = require('./test-runner');
  const port = process.env.PORT || 3000;
  
  const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
    if (process.env.NODE_ENV === 'test') {
      console.log('Running Tests...');
      setTimeout(function () {
        try {
          runner.run();
        } catch (error) {
          console.log('Tests are not valid:', error);
        }
        server.close(); // Close the server after tests
      }, 1500);
    }
  });

  // Handle server errors
  server.on('error', function(error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Tests will continue...`);
      if (process.env.NODE_ENV === 'test') {
        setTimeout(function() {
          try {
            runner.run();
          } catch (error) {
            console.log('Tests are not valid:', error);
          }
        }, 1500);
      }
    } else {
      console.error('Server error:', error);
    }
  });
} else {
  // In production, just export the app for serverless deployment
  const port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log('Production server listening on port ' + port);
  });
}

// Export the app instance for serverless deployment
module.exports = app;