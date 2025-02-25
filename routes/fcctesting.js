'use strict';

const cors = require('cors');
const fs = require('fs');
const path = require('path');

module.exports = function (app) {
  // In production, all testing routes should return unavailable
  if (process.env.NODE_ENV === 'production') {
    app.get('/_api/get-tests', cors(), function(req, res) {
      res.json({status: 'unavailable'});
    });
    app.get('/_api/app-info', function(req, res) {
      res.json({status: 'unavailable'});
    });
    return;
  }

  // Development routes below
  app.route('/_api/server.js')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(path.join(__dirname, '..', 'server.js'), function(err, data) {
        if(err) return next(err);
        res.send(data.toString());
      });
    });
  app.route('/_api/routes/api.js')
    .get(function(req, res, next) {
      console.log('requested');
      fs.readFile(path.join(__dirname, 'api.js'), function(err, data) {
        if(err) return next(err);
        res.send(data.toString());
      });
    });
    
  let error;
  app.get('/_api/get-tests', cors(), function(req, res, next){
    if(!error && process.env.NODE_ENV === 'test') return next();
    res.json({status: 'unavailable'});
  },
  function(req, res, next){
    const runner = require('../test-runner');
    if(!runner.report) return next();
    res.json(testFilter(runner.report, req.query.type, req.query.n));
  },
  function(req, res){
    const runner = require('../test-runner');
    runner.on('done', function(report){
      process.nextTick(() =>  res.json(testFilter(runner.report, req.query.type, req.query.n)));
    });
  });

  app.get('/_api/app-info', function(req, res) {
    let hs = Object.keys(res._headers)
      .filter(h => !h.match(/^access-control-\w+/))
      .map(h => `${h}: ${res._headers[h]}`);
    let hObj = {};
    hs.forEach(h => {
      let key = h.split(': ')[0];
      let value = h.split(': ')[1];
      hObj[key] = value;
    });
    delete res._headers['strict-transport-security'];
    res.json({headers: hObj});
  });
};

function testFilter(tests, type, n) {
  let out;
  switch (type) {
    case 'unit' :
      out = tests.filter(t => t.context.match('Unit Tests'));
      break;
    case 'functional':
      out = tests.filter(t => t.context.match('Functional Tests') && !t.title.match('#example'));
      break;
    default:
      out = tests;
  }
  if(n !== undefined) {
    return out[n] || out;
  }
  return out;
}