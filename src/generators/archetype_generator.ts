import * as namesJSON from "../JSON/name.json"
import * as personalityJSON from "../JSON/personality.json"
import * as identityJSON from "../JSON/identity.json"
import { randomizer, dieRoll, randomizerCount } from "./randomizers";

// One to Four names, with empty names represented by empty strings
export type Name = {
  firstName: string,
  secondName: string,
  thirdName: string,
  fourthName: string,
}

// A character's personality based on quirks, virtues, and troubles
export type Personality = {
  aesthetic: string,
  quirk: string,
  virtue: string,
  trouble: string,
}

// A complete pronoun object
type Pronoun = {
  key: string,
  name: string,
  subPrn: string,
  objPrn: string,
  possAdj: string,
  possPrn: string,
  rflxPrn: string
}

// A gender and typical pronoun
type GenderRoot = {
  gen: string,
  pron: Pronoun,
}

// A gender and a descriptor
export type GenderObject = {
  rts: GenderRoot[]
  desc: string
}

// A character's gender/orientation identity, specifically gender, prnoun,
// sexual attraction, and romantic attraction.
export type Identity = {
  gender: string,
  pronoun: string,
  sexualAttraction: string,
  romanticAttraction: string

}

const names: string[] = (<any>namesJSON).names
const aesthetics: string[] = (<any>personalityJSON).aesthetics
const quirks: string[] = (<any>personalityJSON).quirks
const virtues: string[] = (<any>personalityJSON).virtues
const troubles: string[] = (<any>personalityJSON).troubles
const genderDescriptors: string[] = (<any>identityJSON).genderDescriptors
const genderRoots: string[] = (<any>identityJSON).genderRoots
const pronouns: Pronoun[] = (<any>identityJSON).pronouns
const attractionDescriptors: string[] = (<any>identityJSON).attractionDescriptors
const attractionRoots: string[] = (<any>identityJSON).attractionRoots

/**
 * Retruns a character name composed with 1 to 4 names.
 */
export function generateName(): Name {
  const firstName: string = randomizer(names);

  let secondName: string = ''
  let thirdName: string = ''
  let fourthName: string = ''

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
  }

  return result
}

/**
 * Retruns a personality  constructed from quirk, virtue, and trouble.
 */
export function generatePersonality(): Personality {
  const aesthetic: string = randomizer(aesthetics);
  const quirk: string = randomizer(quirks);
  const virtue: string = randomizer(virtues);
  const trouble: string = randomizer(troubles);

  const result: Personality = {
    aesthetic: aesthetic,
    quirk: quirk,
    virtue: virtue,
    trouble: trouble,
  }

  return result
}

/**
 * Retruns a complex gender/orientation profile.
 */
export function generateIdentity(): Identity {
  let descriptor: string = ''
  let numberOfGenders: number = 1

  // Determine Mild Probability of Multigender Identities
  // 5% Bigender, 3% Polygender, 2% Pangender
  const multigenderDie: number = dieRoll(100)
  if (96 > multigenderDie && multigenderDie > 90 ) {
    descriptor = 'bigender'
    numberOfGenders = 2
  } else if (99 > multigenderDie && multigenderDie > 95 ) {
    descriptor = 'polygender'
    numberOfGenders = dieRoll(4) + 1
  } else if (multigenderDie > 98 ) {
    descriptor = 'pangender'
    numberOfGenders = genderRoots.length
  } else {
    // this is the instance where one is not Multigender
    // check to see if 50% chance of gender descriptor for single-gender
    const genderAdjCoinFlip: number = dieRoll(2)
    if (genderAdjCoinFlip === 2 ) {
      descriptor = randomizer(genderDescriptors)
    }
  }

  const totalGenders: GenderRoot[] = randomizerCount(genderRoots, numberOfGenders)

  let charPronouns: string[] = []
  // 75% chance that a prnoun is the typical pronoun for the given gender
  const expectedPronDie: number = dieRoll(100)
  if (expectedPronDie > 74) {
    charPronouns = randomizerCount(pronouns.map(p => p.name), numberOfGenders);
  } else {
    charPronouns = totalGenders.map(g => g.pron.name)
  }

  const gender: GenderObject = {
    rts: totalGenders,
    desc: descriptor
  }

  const sexualAttractionDesc: string = randomizer(attractionDescriptors)
  const sexualAttractionRoot: string = randomizer(attractionRoots)
  let romanticAttractionDesc: string
  let romanticAttractionRoot: string

  const expectedAttractionDie: number = dieRoll(100)
  // 50% chance of a split orientation
  if (expectedAttractionDie > 50) {
    romanticAttractionDesc = sexualAttractionDesc;
    romanticAttractionRoot = sexualAttractionRoot;
  } else {
    romanticAttractionDesc = randomizer(attractionDescriptors)
    romanticAttractionRoot = randomizer(attractionRoots)
  }

  const sexualAttraction = `${sexualAttractionDesc}${sexualAttractionRoot}sexual`
  const romantictAttraction = `${romanticAttractionDesc}${romanticAttractionRoot}romantic`


  console.log(charPronouns.join("/"))

  const result: Identity = {
    gender: `${gender.desc} ${gender.rts.map(g => g.gen).join("/")}`,
    pronoun: charPronouns.join("/"),
    sexualAttraction: sexualAttraction,
    romanticAttraction: romantictAttraction
  }

  return result
}
