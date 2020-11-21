import * as namesJSON from "../JSON/name.json"
import * as personalityJSON from "../JSON/personality.json"
import * as identityJSON from "../JSON/identity.json"
import { randomizer, dieRoll, randomizerCount } from "./randomizers";

const names: string[] = (<any>namesJSON).names
const quirks: string[] = (<any>personalityJSON).quirks
const ideals: string[] = (<any>personalityJSON).ideals
const flaws: string[] = (<any>personalityJSON).flaws
const genderDescriptors: string[] = (<any>identityJSON).genderDescriptors
const genderRoots: string[] = (<any>identityJSON).genderRoots
const pronouns: string[] = (<any>identityJSON).pronouns
const attractionDescriptors: string[] = (<any>identityJSON).attractionDescriptors
const attractionRoots: string[] = (<any>identityJSON).attractionRoots

// One to Four names, with shorter names represented by empty strings
export type Name = {
  firstName: string,
  secondName: string,
  thirdName: string
  fourthName: string
}

// A complex Pronoun structure
// export type Pronoun = {
//   key: string,
//   name: string,
//   subPrn: string,
//   objPrn: string,
//   possAdj: string,
//   possPrn: string,
//   rflxPrn: string
// }

// A character's personality based on quirks, ideals, and flaws
export type Personality = {
  quirk: string,
  ideal: string,
  flaw: string
}

type GenderRoot = {
  gen: string,
  // change this to a complex pronoun object
  pronoun: string
}

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
 * Retruns a personality  constructed from quirk, ideal, and flaw.
 */
export function generatePersonality(): Personality {
  const quirk: string = randomizer(quirks);
  const ideal: string = randomizer(ideals);
  const flaw: string = randomizer(flaws);

  const result: Personality = {
    quirk: quirk,
    ideal: ideal,
    flaw: flaw,
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
  const tenPct: number = dieRoll(100)
  if (96 > tenPct && tenPct > 90 ) {
    descriptor = 'bigender'
    numberOfGenders = 2
  } else if (99 > tenPct && tenPct > 95 ) {
    descriptor = 'polygender'
    numberOfGenders = dieRoll(4) + 1
  } else if (tenPct > 98 ) {
    descriptor = 'pangender'
    numberOfGenders = genderRoots.length
  } else {
    // this is the instance where one is not Multigender

    // check to see if 50% chance of gender descriptor needed
    const fiftyPct: number = dieRoll(2)
    if (fiftyPct === 2 ) {
      descriptor = randomizer(genderDescriptors)
    }

    // Not sure what this was for tbh
    // genRoots = [randomizer(genderRoots)]
  }

  console.log("GenderRoots Rando: ", genderRoots)
  console.log("numberOfGenders Rando: ", numberOfGenders)

  const totalGenders: GenderRoot[] = randomizerCount(genderRoots, numberOfGenders)
  const charpronouns = randomizerCount(pronouns, numberOfGenders);
  // const possiblePronouns: Pronoun[] = totalGenders.map(gen => gen.pronoun)

  const gender: GenderObject = {
    rts: totalGenders,
    desc: descriptor
  }

  const sxlAttraction = 'sexualAttraction'
  const rtcAttraction = 'romanticAttraction'

  console.log("Descriptor:", descriptor)
  console.log("Desc: ", gender.desc)
  console.log("Roots: ", gender.rts)
  console.log("RootsJoin: ", gender.rts.map(g => g.gen).join(" "))
  console.log("Pronouns: ", charpronouns)



  const result: Identity = {
    gender: `${gender.desc} ${gender.rts.map(g => g.gen).join(" ")}`,
    pronoun: charpronouns.map(p => p.name).join(" "),
    sexualAttraction: sxlAttraction,
    romanticAttraction: rtcAttraction
  }

  console.log(result.gender)
  return result
}
