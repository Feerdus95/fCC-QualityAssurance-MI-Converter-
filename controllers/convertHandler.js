function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    if (!input) {
      result = 1;
    } else {
      const numStr = input.match(/[^a-zA-Z]+/)?.[0];
      if (!numStr) {
        result = 1;
      } else {
        if ((numStr.match(/\//g) || []).length > 1) {
          result = null;
        } else if (numStr.includes('/')) {
          const [numerator, denominator] = numStr.split('/');
          if (!denominator || parseFloat(denominator) === 0) {
            result = null;
          } else {
            result = parseFloat(numerator) / parseFloat(denominator);
          }
        } else {
          const num = parseFloat(numStr);
          result = isNaN(num) ? null : num;
        }
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    if (!input) {
      result = null;
    } else {
      const unit = input.match(/[a-zA-Z]+$/)?.[0]?.toLowerCase();
      if (!unit) {
        result = null;
      } else {
        const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
        result = validUnits.includes(unit.toLowerCase()) ? unit.toLowerCase() : null;
        if (result === 'l') {
          result = 'L';
        }
      }
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    if (!initUnit) {
      result = null;
    } else {
      const unitMap = {
        'gal': 'L',
        'L': 'gal',
        'mi': 'km',
        'km': 'mi',
        'lbs': 'kg',
        'kg': 'lbs'
      };
      result = unitMap[initUnit];
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitNames[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    if (initNum === null || !initUnit) {
      result = null;
    } else {
      switch(initUnit.toLowerCase()) {
        case 'gal':
          result = initNum * galToL;
          break;
        case 'l':
          result = initNum / galToL;
          break;
        case 'lbs':
          result = initNum * lbsToKg;
          break;
        case 'kg':
          result = initNum / lbsToKg;
          break;
        case 'mi':
          result = initNum * miToKm;
          break;
        case 'km':
          result = initNum / miToKm;
          break;
        default:
          result = null;
      }
      
      if (result !== null) {
        result = Number(result.toFixed(5));
      }
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    if (initNum === null || !initUnit || returnNum === null || !returnUnit) {
      result = null;
    } else {
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;