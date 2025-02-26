'use strict';

const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');
const expect = require('chai').expect;

const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  try {
    const input = req.query.input;
    if (!input) {
      return res.status(400).send('invalid input');
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === null && initUnit === null) {
      return res.status(200).send('invalid number and unit');
    }
    if (initNum === null) {
      return res.status(200).send('invalid number');
    }
    if (initUnit === null) {
      return res.status(200).send('invalid unit');
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
  } catch (error) {
    console.error('Error in /api/convert:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;