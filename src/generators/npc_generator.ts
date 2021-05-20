import * as namesJSON from "../JSON/name.json";
import * as personalityJSON from "../JSON/personality.json";
import * as identityJSON from "../JSON/identity.json";
import { randomizer, dieRoll, randomizerCount } from "./randomizers";

// One to Four names, with empty names represented by empty strings
export type Name = {
  firstName: string,
  secondName: string,
  thirdName: string,
  fourthName: string,
};

// A character's personality based on aesthetic, quirk, trouble, and virtues
export type Personality = {
  aesthetic: string,
  quirk: string,
  trouble: string,
  virtue: string,
};

// A gender and a descriptor
export type GenderObject = {
  rts: string[]
  desc: string
};

// A character's gender, pronoun, and attraction model.
export type Identity = {
  gender: string,
  pronoun: string,
  sexualAttraction: string,
  romanticAttraction: string

};

const names: string[] = (<any>namesJSON).names;
const aesthetics: string[] = (<any>personalityJSON).aesthetics;
const quirks: string[] = (<any>personalityJSON).quirks;
const virtues: string[] = (<any>personalityJSON).virtues;
const troubles: string[] = (<any>personalityJSON).troubles;
const genderDescriptors: string[] = (<any>identityJSON).genderDescriptors;
const genderRoots: string[] = (<any>identityJSON).genderRoots;
const pronouns: string[] = (<any>identityJSON).pronouns;
const attractionDescriptors: string[] = (<any>identityJSON).attractionDescriptors;
const attractionRoots: string[] = (<any>identityJSON).attractionRoots;

/**
 * Returns a character name composed with 1 to 4 names.
 * 100% of the time this will return a first name.
 *  85% of the time this will return a first and second name.
 *  50% of the time this will return a first, second, and third name.
 *  15% of the time this will return a first, second,  third, and fourth name.
 */
export function generateName(): Name {
  const firstName: string = randomizer(names);

  let secondName: string = '';
  let thirdName: string = '';
  let fourthName: string = '';

  const nameChance: number = dieRoll(100)
  if (nameChance > 15) {
    secondName = randomizer(names);
  }
  if (nameChance > 50) {
    thirdName = randomizer(names);
  }
  if (nameChance > 85) {
    fourthName = randomizer(names);
  }

  const result: Name = {
    firstName: firstName,
    secondName: secondName,
    thirdName: thirdName,
    fourthName: fourthName
  };

  return result;
}

/**
 * Returns a personality made from an aesthetic, quirk, trouble, and virtue.
 */
export function generatePersonality(): Personality {
  const aesthetic: string = randomizer(aesthetics);
  const quirk: string = randomizer(quirks);
  const trouble: string = randomizer(troubles);
  const virtue: string = randomizer(virtues);

  const result: Personality = {
    aesthetic: aesthetic,
    quirk: quirk,
    virtue: virtue,
    trouble: trouble,
  };

  return result;
}

/**
 * Returns a complex gender, pronoun, and attraction model.
 */
export function generateIdentity(): Identity {
  let descriptor: string = '';
  let numberOfGenders: number = 1;

  // Determine Probability of Multigender Identities
  // 5% Bigender, 5% Polygender
  const multigenderDie: number = dieRoll(100)
  if (multigenderDie > 96 ) {
    descriptor = 'Polygender';
    numberOfGenders = dieRoll(4) + 1
  } else if (multigenderDie > 90 ) {
    descriptor = 'Bigender';
    numberOfGenders = 2;
  } else {
    // this is the instance where one has only one gender
    // check to see if 50% chance of gender descriptor for single-gender
    const genderAdjCoinFlip: number = dieRoll(2);
    if (genderAdjCoinFlip === 2 ) {
      descriptor = randomizer(genderDescriptors);
    }
  }

  const totalGenders: string[] = randomizerCount(genderRoots, numberOfGenders);

  let pronounBucket: string[] = [];
  let charPronouns: string[] = [];

  totalGenders.forEach(gender => {
    // 75% chance that pronoun is the "common" choice for a given gender
    const expectedPronDie: number = dieRoll(100);
    if (expectedPronDie > 25 ) {
        switch(gender){
        case "Boy":
          pronounBucket.push("He/Him");
          break;
        case "Girl":
          pronounBucket.push("She/Her");
          break;
        case "Man":
          pronounBucket.push("He/Him");
          break;
        case "Woman":
          pronounBucket.push("She/Her");
          break;
        default:
          pronounBucket.push("They/Them");
      }
    } else {
      // 25% chance for a random pronoun
      const randomPrn: string = randomizer(pronouns);
      pronounBucket.push(randomPrn);
    }
    // Uncommon Pronoun Die
    // 25% chance for an extra pronoun.
    // 2% chance for "no pronoun"
    // 2% chance for "any pronoun"
    const uncommonPronounDie: number = dieRoll(100);
    if (uncommonPronounDie > 74) {
      const randomExtraPrn: string = randomizer(pronouns);
      pronounBucket.push(randomExtraPrn);
    } else if (uncommonPronounDie > 72) {
        pronounBucket = ["No Pronoun"]
    } else if  (uncommonPronounDie > 70) {
        pronounBucket = ["Any Pronouns"]
    }
    // filter redundant pronouns
    pronounBucket.forEach((pronoun) => {
      if (!charPronouns.includes(pronoun)){
        charPronouns.push(pronoun);
      }
    });
  });

const gender: GenderObject = {
  rts: totalGenders,
  desc: descriptor
}


const sexualAttractionRoot: string = randomizer(attractionRoots)
let sexualAttractionDesc: string
let romanticAttractionRoot: string
let romanticAttractionDesc: string

  const sexualAttractionDescDie: number = dieRoll(100)
  // 50% chance of a sexual attraction descriptor
  if (sexualAttractionDescDie > 50) {
    sexualAttractionDesc = randomizer(attractionDescriptors)
  } else {
    sexualAttractionDesc = ""
  }

  const homogeneousAttractionDie: number = dieRoll(100)
  // 50% chance of a split orientation
  if (homogeneousAttractionDie > 50) {
    romanticAttractionDesc = sexualAttractionDesc;
    romanticAttractionRoot = sexualAttractionRoot;
  } else {
    romanticAttractionRoot = randomizer(attractionRoots)
    const romanticAttractionDescDie: number = dieRoll(100)
    if (romanticAttractionDescDie > 50) {
      romanticAttractionDesc = randomizer(attractionDescriptors)
    } else {
      romanticAttractionDesc = ""
    }
  }

  const sexualAttraction = `${sexualAttractionDesc}${sexualAttractionRoot}sexual`
  const romanticAttraction = `${romanticAttractionDesc}${romanticAttractionRoot}romantic`

  const result: Identity = {
    gender: `${gender.desc} ${gender.rts.join("/")}`,
    pronoun: charPronouns.join(", "),
    sexualAttraction: sexualAttraction,
    romanticAttraction: romanticAttraction
  }

return result
}
