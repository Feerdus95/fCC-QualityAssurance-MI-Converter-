'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/').get(function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

fccTestingRoutes(app);
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
  app.listen(port, function () {
    console.log('Listening on port ' + port);
    if (process.env.NODE_ENV === 'test') {
      console.log('Running Tests...');
      setTimeout(function () {
        try {
          runner.run();
        } catch (error) {
          console.log('Tests are not valid:', error);
        }
      }, 1500);
    }
  });
}

// Export the app instance for serverless deployment
module.exports = app;