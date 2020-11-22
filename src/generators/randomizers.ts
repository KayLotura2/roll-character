// This module holds the randomizers.


/**
 * Takes in an array, and returns a value from a random index.
 * @param array
 */
function randomizer(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}


/**
 * Takes in an integer for die size, and returns a random result for that die.
 * @param diesize
 */
function dieRoll(diesize: number): number {
  var die: number[] = Array.from(Array(diesize)).map((e, i) => i)
  var result: number = (randomizer(die) + 1);
  return result;
}

// TODO: Fix this it doesn't seem to be working right...
/**
 * Takes in an array and a value, and returns a new array of distinct random values
 * from the original array. This new array has a length equal to the value.
 * @param originalArray
 * @param num
 */
function randomizerCount(originalArray: any[], num: number): any[] {
  if (num > originalArray.length) {
    console.log('Error, results requested is as long as or longer than array')
  }
  let resultBasket: any[] = [];
  var itemBasket: any[] = [];
  var catalogue: number[] = Array.from(Array(originalArray.length)).map((e, i) => i)

  let i: number;
  for (i = 0; i < num; i++) {
    const randomItemIndex: number = randomizer(catalogue);
    itemBasket.push(catalogue[randomItemIndex]);
    catalogue.filter(i => i !== randomItemIndex);
  }
  itemBasket.forEach(indexPoint => {
    resultBasket.push(originalArray[indexPoint])
  });
  return resultBasket;
}


// Uses randomizer to randomly return true or false.
function flipCoin() {
  var coin = [0, 1];
  var flip = randomizer(coin);
  if (flip === 1) {
    return true;
  } else {
    return false;
  }
}

export { flipCoin, randomizerCount, dieRoll, randomizer };
