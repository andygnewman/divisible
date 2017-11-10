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

const primes = [2,3,5,7,11,13,17,19];

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
for (let i = 2; i <= 20; i++) {
  recursiveFactorTree(i);
}

// then multiple up all the primes factored up to the highest factor levels found
const lowest = primes.reduce((acc, prime) => acc * Math.pow(prime, primeFactors[prime]), 1);

console.log('The smallest number divisible evenly by all the numbers between 1 and 20 is: ', lowest);
