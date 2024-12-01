export function checkNumberProperties(num) {
    const properties = {
      isPrime: null,
      isComposite: null,
      isRational: true, // Irrational numbers are non-integers like sqrt(2), but this is just a numeric check
      isTerminating: null,
      isWhole: num >= 0 && Number.isInteger(num),
      isNatural: num > 0 && Number.isInteger(num),
      isNegative: num < 0,
      isZero: num === 0
    };
  
    // Prime and Composite Check
    if (num > 1 && Number.isInteger(num)) {
      let isPrime = true;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          isPrime = false;
          break;
        }
      }
      properties.isPrime = isPrime;
      properties.isComposite = !isPrime;
    } else {
      properties.isPrime = false;
      properties.isComposite = false;
    }
  
    // Rational/Irrational (Assume input is a number, not NaN)
    if (Number.isFinite(num)) {
      properties.isRational = true; // All finite numbers in JS are rational
    } else {
      properties.isRational = false; // Non-finite like Infinity
    }
  
    // Terminating/Non-Terminating Check (for fractions)
    if (num % 1 !== 0) {
      let decimal = num.toString().split(".")[1]; // Get decimal part
      if (decimal) {
        let reducedFraction = reduceFraction(num);
        let denominator = reducedFraction.denominator;
  
        // A decimal terminates if the denominator is of the form 2^m * 5^n
        while (denominator % 2 === 0) denominator /= 2;
        while (denominator % 5 === 0) denominator /= 5;
        properties.isTerminating = denominator === 1;
      }
    } else {
      properties.isTerminating = true; // Integers always terminate
    }
  
    return properties;
  }
  
  // Helper Function: Reduce Fraction
  function reduceFraction(num) {
    let numerator = Math.abs(num.toString().split(".")[1] || 0); // Convert to whole numbers
    let denominator = Math.pow(10, numerator.toString().length);
  
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);
  
    return { numerator: numerator / divisor, denominator: denominator / divisor };
  }
  