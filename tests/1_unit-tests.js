const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function getNum', function() {
    test('Whole number input', function() {
      assert.equal(convertHandler.getNum('32L'), 32);
    });
    
    test('Decimal Input', function() {
      assert.equal(convertHandler.getNum('3.1mi'), 3.1);
    });
    
    test('Fractional Input', function() {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
    });
    
    test('Fractional Input with Decimal', function() {
      assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
    });

    test('Invalid Input (double fraction)', function() {
      assert.isNull(convertHandler.getNum('3/2/3kg'));
    });
    
    test('No Numerical Input', function() {
      assert.equal(convertHandler.getNum('kg'), 1);
    }); 
  });
  
  suite('Function getUnit', function() {
    test('For Each Valid Unit Inputs', function() {
      const units = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      units.forEach(function(unit) {
        assert.isNotNull(convertHandler.getUnit(unit));
      });
    });
    
    test('Unknown Unit Input', function() {
      assert.isNull(convertHandler.getUnit('invalid'));
    });
  });
  
  suite('Function getReturnUnit', function() {
    test('For Each Valid Unit', function() {
      const input = ['gal','L','mi','km','lbs','kg'];
      const expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(unit, i) {
        assert.equal(convertHandler.getReturnUnit(unit), expect[i]);
      });
    });
  });
  
  suite('Function spellOutUnit', function() {
    test('For Each Valid Unit', function() {
      const input = ['gal','L','mi','km','lbs','kg'];
      const expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(unit, i) {
        assert.equal(convertHandler.spellOutUnit(unit), expect[i]);
      });
    });
  });
  
  suite('Function convert', function() {
    test('Gal to L', function() {
      assert.approximately(convertHandler.convert(5, 'gal'), 18.9271, 0.1);
    });
    
    test('L to Gal', function() {
      assert.approximately(convertHandler.convert(5, 'L'), 1.32086, 0.1);
    });
    
    test('Mi to Km', function() {
      assert.approximately(convertHandler.convert(5, 'mi'), 8.0467, 0.1);
    });
    
    test('Km to Mi', function() {
      assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1);
    });
    
    test('Lbs to Kg', function() {
      assert.approximately(convertHandler.convert(5, 'lbs'), 2.26796, 0.1);
    });
    
    test('Kg to Lbs', function() {
      assert.approximately(convertHandler.convert(5, 'kg'), 11.02312, 0.1);
    });
  });
});