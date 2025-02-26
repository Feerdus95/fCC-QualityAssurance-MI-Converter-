'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
    const convertHandler = new ConvertHandler();

    function roundToFive(num) {
        return Math.round(num * 100000) / 100000;
    }

    app.route('/api/convert').get(function (req, res) {
        try {
            const input = req.query.input;
            if (!input) {
                return res.status(400).json({ error: 'invalid input' });
            }

            const initNum = convertHandler.getNum(input);
            const initUnit = convertHandler.getUnit(input);

            if (initNum === 'invalid number' && initUnit === 'invalid unit') {
                return res.json({ error: 'invalid number and unit' });
            }
            if (initNum === 'invalid number') {
                return res.json({ error: 'invalid number' });
            }
            if (initUnit === 'invalid unit') {
                return res.json({ error: 'invalid unit' });
            }

            const returnNum = convertHandler.convert(initNum, initUnit);
            const returnUnit = convertHandler.getReturnUnit(initUnit);

            const initUnitLower = initUnit === 'L' ? 'L' : initUnit.toLowerCase();
            const returnUnitLower = returnUnit === 'L' ? 'L' : returnUnit.toLowerCase();

            const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

            console.log("initNum:", initNum);
            console.log("initUnit:", initUnit);
            console.log("returnNum:", returnNum);
            console.log("returnUnit:", returnUnit);
            console.log("string:", string);
            console.log("res.body", {initNum, initUnit: initUnitLower, returnNum: roundToFive(returnNum), returnUnit: returnUnitLower, string});

            res.json({
                initNum,
                initUnit: initUnitLower,
                returnNum: roundToFive(returnNum),
                returnUnit: returnUnitLower,
                string
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
};