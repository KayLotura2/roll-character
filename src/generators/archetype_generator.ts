import * as namesJSON from "../JSON/name.json"
import * as personalityJSON from "../JSON/personality.json"
import { randomizer, dieRoll } from "./randomizers";

const names: string[] = (<any>namesJSON).names
const quirks: string[] = (<any>personalityJSON).quirks
const ideals: string[] = (<any>personalityJSON).ideals
const flaws: string[] = (<any>personalityJSON).flaws

export type Name = {
  firstName: string,
  secondName: string,
  thirdName: string
  fourthName: string
}

export type Pronoun = {
  key: string,
  name: string,
  subPrn: string,
  objPrn: string,
  possAdj: string,
  possPrn: string,
  rflxPrn: string
}


export type Personality = {
  // gender: string,
  // pronouns: Pronoun,
  // orientation: string,
  quirk: string,
  ideal: string,
  flaw: string
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
 * Retruns a personality profile.
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
