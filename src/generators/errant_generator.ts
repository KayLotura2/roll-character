import * as archetypesJSON from '../JSON/ERRANT/archetypes.json';
import * as ancestriesJSON from '../JSON/ERRANT/ancestries.json';
import * as professionsJSON from '../JSON/ERRANT/professions.json';
import * as equipmentJSON from '../JSON/ERRANT/gear.json';
import * as languageJSON from '../JSON/NPC/languages.json';
import * as sorceriesJSON from '../JSON/ERRANT/sorceries.json';
import { randomizer, flipCoin, diceRoll, dieRoll, randomizerCount } from './randomizers';;
import { generateName, generateIdentity } from './npc_generator';

// Structure for an Errant Full Character
export type ErrantFullCharacter = {
  name: string,
  archetype: string,
  pronouns: string,
  alignment: string,
  age: number,
  failedProfession: string,
  keepsake: string,
  ancestry: string
  phys: number,
  skill: number,
  mind: number,
  pres: number,
  damageDie: number,
  speed: number,
  languages: string[],
  encumbrance: number,
  inventory: string[]
  features: string[]
};

export type AgeDice = {
  numberOfDice: number,
  dieSize: number,
  adder: number
}

export type Ancestry = {
  type: string,
  ageDice: AgeDice,
  options: string[],
  feature: string
}

export type Archetype = {
  name: string,
  type: string,
  alignments: string[],
  damageDie: number,
  primaryAttr: string,
  givenFeatures: string[],
  randomizedFeatures: any,
}

export type Attributes = {
  mind: number,
  phys: number,
  pres: number,
  skill: number,
};

export type Benefits = {
  items: Item[],
  features: string[]
}

export type Item = {
  type: string
  QSlots: number
}

// Names of Archetypes
export enum ArchetypeName {
  DEVIANT = 'DEVIANT',
  OCCULT = 'OCCULT',
  VIOLENT = 'VIOLENT',
  ZEALOT = 'ZEALOT'
};

// Pull in JSON Objects
const ancestries: Ancestry[] = (<any>ancestriesJSON).ancestries
const archetypes: Archetype[] = (<any>archetypesJSON).archetypes
const baseGear: Item[] = (<any>equipmentJSON).baseGear
const grimoires: Item[] = (<any>equipmentJSON).grimoires
const heavyRangedWeapons: Item[] = (<any>equipmentJSON).heavyRangedWeapons
const heavyWeapons: Item[] = (<any>equipmentJSON).heavyWeapons
const keepsakes: string[] = (<any>equipmentJSON).keepsakes
const languages: string[] = (<any>languageJSON).languages
const mediumRangedWeapons: Item[] = (<any>equipmentJSON).mediumRangedWeapons
const mediumWeapons: Item[] = (<any>equipmentJSON).mediumWeapons
const professions: string[] = (<any>professionsJSON).professions
const quiver: Item = (<any>equipmentJSON).quiver
const relics: Item[] = (<any>equipmentJSON).relics
const shields: Item[] = (<any>equipmentJSON).shields
const tools: Item[] = (<any>equipmentJSON).tools
const effects: string[] = (<any>sorceriesJSON).effects
const spheres: string[] = (<any>sorceriesJSON).spheres

/**
 * Returns a random Errant Archetype.
 * @returns Archetype
 */
export function generateArchetype(): Archetype {
  const result: Archetype = randomizer(archetypes);
  return result;
}

/**
 * Returns a random Errant Ancestry.
 * @returns Ancestry
 */
export function generateAncestry(): Ancestry {
  const result: Ancestry = randomizer(ancestries);
  return result;
}

/**
 * Returns a randomized age based on a given AgeDice.
 * @param AgeDice
 * @returns number
 */
export function generateAge(ageDice: AgeDice): number {
  const result: number = diceRoll(ageDice.numberOfDice, ageDice.dieSize) + ageDice.adder;
  return result;
}

/**
 * Returns a randomized list of languages based on a given MIND value.
 * @param number
 * @returns number
 */
export function generateLanguage(mind: number): string[] {
  let result: string[] = []
  if (mind > 10) {
    result = randomizerCount(languages, (mind - 10));
  }
  result.unshift('Ancestral tongue')
  result.unshift('Regional common')
  return result;
}

/**
 * Check Proficiency Dice.
 * @param profDice: number
 * @returns number
 */
export function getToolRoll(profDice: number[]): number {

  let result: number = (dieRoll(2) - 1);
  if (profDice.includes(0) && !profDice.includes(1)) {
    result = 0
  } else if (profDice.includes(1) && !profDice.includes(0)) {
    result = 1
  }
  return result
}

/**
 * Returns a randomized list group of Items and Features based on a given archetype.
 * @param string (ArchetypeName enum)
 * @returns Benefits
 */
export function generateArchetypeBenefits(archetype: Archetype, skill: number): Benefits {

  let result: Benefits = {
    items: [],
    features: []
  }

  // TODO: Gatta hacktogeher sorceries from grimoires...
  switch (archetype.name) {
    case 'DEVIANT':
      const hasMastery = flipCoin();

      if (hasMastery) {
        const profDie: number = dieRoll(10) - 1;
        const toolDie: number = getToolRoll([profDie]);

        result.items.push(tools[toolDie]);
        result.features.push(archetype.randomizedFeatures.masteryPairs[profDie])
      } else {
        const zeroToNine = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        console.log(zeroToNine)
        const profDice: number[] = randomizerCount(zeroToNine, 2);
        const toolDie: number = getToolRoll(profDice);

        result.items.push(tools[toolDie]);
        result.features.push(archetype.randomizedFeatures.proficiencies[profDice[0]])
        result.features.push(archetype.randomizedFeatures.proficiencies[profDice[1]])
      }
      result.features.push(`Jettons: ${skill +2}`)
      break;
    case 'OCCULT':
      const charGrimoires: Item[] = randomizerCount(grimoires, 4);
      charGrimoires.map((g) => `Grimoire with sorcery of ${generateSorcery} \n`)
      result.items.push(...charGrimoires);
      //TODO Add Sorceries
      break;
    case 'VIOLENT':
      const violentGearDie: number = dieRoll(4)
      switch (violentGearDie) {
        case 1:
          result.items.push(randomizer(heavyWeapons));
        case 2:
          result.items.push(randomizer(heavyRangedWeapons));
          result.items.push(quiver);
        case 3:
          result.items.push(shields[0]);
        case 4:
          result.items.push(shields[1]);
      }
      break
    case 'ZEALOT':
      const covenant: string = randomizer(archetype.randomizedFeatures.covenants)
      const relic: Item = randomizer(relics)

      result.features.push(covenant)
      result.items.push(relic)
      break
  };
  result.features.push(...archetype.givenFeatures)
  return result
};

/**
 * Returns a randomized medium weapon or ranged medium weapon and quiver.
 * @returns Item[]
 */
export function generateBaseWeapon(): Item[] {
  const isMelee: Boolean = flipCoin();
  if (isMelee) {
    return [randomizer(mediumWeapons)];
  } else {
    return [
      randomizer(mediumRangedWeapons),
      quiver
    ];
  }
}

/**
 * Returns a sorcery for a grimoire.
 * @returns string
 */
export function generateSorcery(): string {
  return `${randomizer(effects)} ${randomizer(spheres)}`
}

/**
 * Calculates a character's encumbrance based on how many items they're carrying.
 * @param phys
 * @param items
 * @returns number
 */
export function calcEncumbrance(phys: number, items: Item[]): number {
  let result: number = 0
  let weight: number = 0

  for (var item of items) {
    weight += item.QSlots
  }

  if (weight > phys * 4) {
    result = 4
    const extraWeight = Math.floor(weight - (phys * 4) / 4)
    result += extraWeight
  } else {
    const enc: number = Math.floor((phys * weight) / 4)
    result = enc;
  }
  return result;
}

/**
 * Conversts Item[] to string[] with slots used.
 * @param inventory
 * @returns string[]
 */
export function writeInventory(inventory: Item[]): string[] {
  const result: string[] = inventory.map((item: Item) => {
    return `${item.type}, ${item.QSlots / 4} slots`
  });
  return result;
}

/**
 * Rolls Attribute scores, then swaps one for optimal archetype matching.
 * @param primaryAttr
 * @returns Attributes
 */
export function generateAttributes(primaryAttr: string): Attributes {
  let result: Attributes = {
    mind: diceRoll(4,4),
    phys: diceRoll(4,4),
    pres: diceRoll(4,4),
    skill: diceRoll(4,4),
  }
  const highestAttr: Array<string|number> = Object.entries(result).reduce((previousValue, [key, value]) => value > previousValue[1] ? [key, value] : previousValue);
  
  if (highestAttr[0] === primaryAttr) {
    return result
  } else {
    const highestAttrNameTyped = highestAttr[0] as keyof typeof result;
    const primaryAttrNameTyped = primaryAttr as keyof typeof result;

    const highestScore: number =  highestAttr[1] as number;
    const oldScore: number = result[primaryAttrNameTyped];

    result[highestAttrNameTyped] = oldScore;
    result[primaryAttrNameTyped] = highestScore;

    return result;
  }
}

/**
 * Build a full character.
 */
export function generateErrantCharacter(): ErrantFullCharacter {
  const archetype: Archetype = generateArchetype();
  const ancestry: Ancestry = generateAncestry();
  const baseWeapon: Item[] = generateBaseWeapon();
  const attributes: Attributes = generateAttributes(archetype.primaryAttr)
  const benefits: Benefits = generateArchetypeBenefits(archetype, attributes.skill);

  const name: string = `${Object.values(generateName()).join(' ')}`;
  const archetypeName: string = `${archetype.type}`;
  const pronouns: string = `${generateIdentity().pronoun}`;
  const alignment: string = `${randomizer(archetype.alignments)}`;
  const age: number = generateAge(ancestry.ageDice);
  const failedProfession: string = randomizer(professions);
  const keepsake: string = randomizer(keepsakes);
  // Migh intigrate this in some touchup point
  // const ancestryName: string = `${ancestry.type}`;
  const phys: number = attributes.phys;
  const skill: number = attributes.skill;
  const mind: number = attributes.mind;
  const pres: number = attributes.pres;
  const damageDie: number = archetype.damageDie;
  const languages: string[] = generateLanguage(mind);
  const inventory: Item[] = [...baseWeapon, ...baseGear, ...benefits.items];
  const features: string[] = [ancestry.feature, ...benefits.features];
  const encumbrance: number = calcEncumbrance(phys, inventory);
  const encSpeed: number = Math.floor((skill - encumbrance) / 4);
  const inventoryString: string[] = writeInventory(inventory);

  // Now put it all together
  const result: ErrantFullCharacter = {
    name: name,
    archetype: archetypeName,
    pronouns: pronouns,
    alignment: alignment,
    age: age,
    failedProfession: failedProfession,
    keepsake: keepsake,
    ancestry: ancestry.type,
    phys: phys,
    skill: skill,
    mind: mind,
    pres: pres,
    damageDie: damageDie,
    speed: encSpeed,
    languages: languages,
    encumbrance: encumbrance,
    inventory: inventoryString,
    features: features
  }

  console.log(result);

  return result
}

generateErrantCharacter();
