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
    const normalizedUnit = unit === 'L' || unit === 'l' ? 'L' : unit.toLowerCase();
    return normalizedUnit in conversionRates;
  };

  this.getNum = function(input) {
    if (!/[\d/.]/.test(input)) return 1;
    
    try {
      const numStr = input.match(/^[\d/.]+/)[0];
      if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';
      
      const result = numStr.includes('/') 
        ? numStr.split('/').reduce((num, denom) => parseFloat(num) / parseFloat(denom))
        : parseFloat(numStr);
      
      return isNaN(result) ? 'invalid number' : result;
    } catch (e) {
      return 'invalid number';
    }
  };
  
  this.getUnit = function(input) {
    const unit = input.match(/[a-zA-Z]+$/)?.[0]?.toLowerCase() || '';
    return unit === 'l' ? 'L' : (isValidUnit(unit) ? unit.toLowerCase() : 'invalid unit');
  };
  
  this.getReturnUnit = function(initUnit) {
    if (!initUnit) return 'invalid unit';
    const unit = initUnit === 'L' ? 'L' : initUnit.toLowerCase();
    return isValidUnit(unit) ? conversionRates[unit].to : 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    return spelledUnits[unit] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    }
    if (initNum === 'invalid number') {
      return 'invalid number';
    }
    if (!isValidUnit(initUnit)) {
      return 'invalid unit';
    }
    
    const unit = initUnit === 'L' ? 'L' : initUnit.toLowerCase();
    const conversion = conversionRates[unit];
    const result = initNum * conversion.rate;
    return Math.round(result * 100000) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === 'invalid number' || initUnit === 'invalid unit') {
      return 'invalid number and unit';
    }
    
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;