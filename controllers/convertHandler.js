function roundToFive(num) {
  return Math.round(num * 100000) / 100000;
}

function ConvertHandler() {
  const conversionRates = {
      gal: { to: 'L', rate: 3.78541 },
      L: { to: 'gal', rate: 1 / 3.78541 },
      lbs: { to: 'kg', rate: 0.453592 },
      kg: { to: 'lbs', rate: 1 / 0.453592 },
      mi: { to: 'km', rate: 1.60934 },
      km: { to: 'mi', rate: 1 / 1.60934 }
  };

  const spelledUnits = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
  };

  const isValidUnit = (unit) => {
      if (!unit) return false;
      const normalizedUnit = unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase();
      return normalizedUnit in conversionRates;
  };


  this.getNum = function(input) {
      if (!input) return 1;

      const numStr = input.match(/^[\d/.]+/)?.[0] || '1';
      if (numStr === '1' && !input.match(/[a-zA-Z]+/)) return 1; //Handles input like "//"

      if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';

      try {
          const parts = numStr.split('/');
          if (parts.length === 2) {
              const num = parseFloat(parts[0]);
              const denom = parseFloat(parts[1]);
              if (isNaN(num) || isNaN(denom) || denom === 0) return 'invalid number';
              return roundToFive(num / denom);
          }

          const result = parseFloat(numStr);
          return isNaN(result) ? 'invalid number' : roundToFive(result);
      } catch (e) {
          return 'invalid number';
      }
  };

  this.getUnit = function(input) {
      const unitMatch = input?.match(/[a-zA-Z]+$/)?.[0];

      if (!unitMatch) return 'invalid unit';

      const unit = unitMatch.toLowerCase();
      return isValidUnit(unit) ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
      if (!initUnit || initUnit === 'invalid unit') return 'invalid unit';
      const unit = initUnit === 'L' ? 'L' : initUnit.toLowerCase();
      return isValidUnit(unit) ? conversionRates[unit].to : 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
      if (!unit || unit === 'invalid unit') return 'invalid unit';
      return spelledUnits[unit] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
      if (initNum === 'invalid number' || !initNum) return 'invalid number';
      if (!isValidUnit(initUnit)) return 'invalid unit';

      const unit = initUnit === 'L' ? 'L' : initUnit.toLowerCase();
      const conversion = conversionRates[unit];
      const result = initNum * conversion.rate;
      return roundToFive(result);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
          return 'invalid number and unit';
      }
      if (initNum === 'invalid number') {
          return 'invalid number';
      }
      if (initUnit === 'invalid unit') {
          return 'invalid unit';
      }

      return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`; // EXACT format
  };
}

module.exports = ConvertHandler;