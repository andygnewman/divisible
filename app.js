// Initial approach of iterating numbers until find one that is divisible evenly
// by all numbers between 1 and 20

// However this resulted in memory being used up and crashing.

  // const START_NUMBER = 1;
  //
  // const INITITAL_DENOMINATOR = 1;
  // const FINAL_DENOMINATOR = 20;
  //
  // let testNumber = START_NUMBER;
  // let matchMade = false;
  //
  // console.log('Starting');
  //
  // do {
  //   console.log('testNumber: ', testNumber);
  //   for (let i = 0; i <=20; i++) {
  //     if (testNumber % i !==0) {
  //       testNumber += 1;
  //       break
  //     }
  //     if (i === 20) {
  //       matchMade = true;
  //     }
  //   }
  // } while (!matchMade);
  //
  // console.log('The smallest number divisble evenly by all the integers between 1 and 20 is: ', testNumber);

// So I googled the problem and ended up learning about Prime Factors!
// Armed with that knowledge I set up coding it up.

// And it works

const START_NUMBER = 1; // This code assumes that START_NUMBER is always 1
const END_NUMBER = 20;

const evalNumbers = Array.from({length: END_NUMBER}, (val, index) => START_NUMBER + index);

const primes = [];
evalNumbers.map(num => {
  // first 2 conditions assume that START_NUMBER is always 1
  if (num <= 1) return;
  if (primes.length === 0) return primes.push(num);
  // based on understanding that a number is a prime if not divisble evenly by
  // any prime number below the square root of the number being evalauated
  if (!primes.some(prime => ((prime <= Math.sqrt(num)) && (num % prime === 0)))) {
    primes.push(num);
  };
});

// seed initial key value pairs for prime factors
const primeFactors = {}
primes.map(prime => primeFactors[prime] = 1);

// calculate factor (power) for divisble primes
const calcFactor = (num) => {
  // find the smallest divisble prime
  const lowestPrime = primes.find(prime => num % prime === 0);
  let factor = 0;
  let multiplier = num;

  // keep dividing by that lowest prime until not evenly divisble and
  // increment the factor each time you do
  while (multiplier % lowestPrime === 0) {
    multiplier = multiplier / lowestPrime;
    factor += 1;
  }

  // record the factor of that prime if higher than existing
  if (primeFactors[lowestPrime] < factor) {
    primeFactors[lowestPrime] = factor;
  }

  // send back the remaining multiplier to have this process done to it
  return multiplier;
};

const recursiveFactorTree = function recursion(num) {
  // send the number through the factor process
  const multiplier = calcFactor(num);
  // if the result is one, stop.
  if (multiplier === 1) {
    return;
  }
  // otherwise undertake the process again on the result
  recursion(multiplier);
}

// loop through numbers from 2 to 20 (1 not needed as every integer is divisble by 1)
evalNumbers.map(num => recursiveFactorTree(num));

// then multiple up all the primes factored up to the highest factor levels found
const lowest = primes.reduce((acc, prime) => acc * Math.pow(prime, primeFactors[prime]), 1);

console.log(`The smallest number divisible evenly by all the numbers between ${START_NUMBER} and ${END_NUMBER} is: ${lowest}`);
