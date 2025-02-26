'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input;
    if (!input) {
      return res.status(400).send('invalid input');
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === null && initUnit === null) {
      return res.send('invalid number and unit');
    }
    if (initNum === null) {
      return res.send('invalid number');
    }
    if (initUnit === null) {
      return res.send('invalid unit');
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};