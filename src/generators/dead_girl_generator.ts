import * as classJSON from '../UNDEADGIRL/class.json';
import * as gearJSON from '../UNDEADGIRL/gear.json';
import * as namesJSON from '../UNDEADGIRL/name.json';
import * as terribleTraitsJSON from '../UNDEADGIRL/terribleTraits.json';
import { randomizer, dieRoll, diceRoll, randomizerCount, flipCoin } from './randomizers';

// Structure of typed gear, such as Weapons, Armor, and Scrolls
export type TypedGear = {
  [key: string]: string[]
}

// Gear for Mörk Borg can be Equipment (carried items), Companions, Vehicles, or a Bag. 
export type EquipmentCVB = {
  equipment: string[],
  companionVehilceBag: string[],
}

// Structure of named abilities or features
export type Power = {
  featureName: string,
  featureDesc: string,
  featureEquipmentCVB: EquipmentCVB
};

// Structure of a DeadgirlClass 
export type DeadGirlClass = {
  desc: string,
  silver: {
    numberDice: number,
    dieSize: number,
    multiplier: number
  },
  scrollType: string,
  omensDie: number,
  weaponDie: number,
  armorDie: number,
  reRollScroll: false,
  aglMod: number,
  preMod: number,
  strMod: number,
  tghMod: number,
  HD: number,
  features: Power[],
  powers: {
    number: number,
    listy: Power[],
  }
};

// Structure of full DeadgirlClass Object
export type DeadGirlClassObj = {
  className: string,
  charClass: DeadGirlClass
};

// Structure for a Full Character
export type FullDeadGirlCharacter = {
  name: string,
  className: string,
  classDescription: string,
  scar: string,
  graveMark: string,
  hitPoints: number,
  strength: number,
  agility: number,
  presence: number,
  toughness: number,
  features: Power[],
  omens: string,
  equipment: string[],
  companionVehicles: string[],
  weapon: string,
  armor: string,
  inventoryCount: number
};

// Types of Scrolls
export enum ScrollType {
  ANY = 'ANY',
  NORMAL = 'NORMAL',
  NONE = 'NONE',
  FUNGAL = 'FUNGAL',
  OCHRE = 'OCHRE',
  SACRED = 'SACRED',
  SALT = 'SALT',
  UNCLEAN = 'UNCLEAN'
}

// Pull in JSON Objects
const armor: TypedGear = (<any>gearJSON).armor;
const charClasses: DeadGirlClassObj[] = (<any>classJSON).charClasses;
const gearA: string[] = (<any>gearJSON).gearA;
const names: string[] = (<any>namesJSON).names;
const scrolls: TypedGear = (<any>gearJSON).scrolls;
const scars: string[] = (<any>terribleTraitsJSON).scars;
const graveMarks: string[] = (<any>terribleTraitsJSON).graveMarks;
const weapons: string[] = (<any>gearJSON).weapons;

/**
 * Returns a character name
 */
export function generateName(): string {
    return randomizer(names);
  }

/**
 * Retruns a random character class.
 * @returns CharClassObj
 */
export function generateDeadGirlClass(): DeadGirlClassObj {

  const result: DeadGirlClassObj = randomizer(charClasses);

  return result;
}

/**
 * Rolls 3d6, adds bonuses, and returns ability score.
 * @param bonus number
 * @returns number
 */
export function generateAbility(bonus: number): number {
  const threeDSix: number = diceRoll(3, 6);
  const abilityTotal: number = threeDSix + bonus;

  let result: number = 0

  switch (abilityTotal) {
    case 1: case 2: case 3: case 4:
      result = -3;
      break;
    case 5: case 6:
      result = -2;
      break;
    case 7: case 8:
      result = -1;
      break;
    case 9: case 10: case 11: case 12:
      result = 0;
      break;
    case 13: case 14:
      result = 1;
      break;
    case 15: case 16:
      result = 2;
      break;
    case 17: case 18: case 19: case 20:
      result = 3
      break;
  }

  return result;
}

/**
 * Generates Carrying Gear, like a sack or donkey, or nothing but yer mitts and wits.
 * @returns string
 */
export function generateGearA(): EquipmentCVB {
  let gearARoll = dieRoll(6)
  let result: EquipmentCVB = {
    equipment: [],
    companionVehilceBag: [
      `${gearA[gearARoll - 1]}`
    ]
  };
  if (gearARoll === 6) result.companionVehilceBag.push(`Skeleton, ${generateName()} [ Atk/Def 12 | fist d2 | 5 HP| Morale - | no armor ]`);

  return result
}

/**
 * Generates Scroll
 * @param scrollType ScrollType
 * @returns string
 */
export function genearteScroll(scrollType: string): string {
  let result: string = 'Scroll Error...'
  if (scrollType == 'NONE') { return result };
  if (scrollType == 'ANY') { scrollType = randomizer(['UNCLEAN', 'SACRED', 'FUNGAL', 'OCHRE', 'SALT']) };

  switch (scrollType) {
    case ('NORMAL'):
      const holyScroll = flipCoin();
      if (holyScroll) {
        result = `Sacred Scroll of ${randomizer(scrolls.sacredScrolls)}`;
      } else {
        result = `Unclean Scroll of ${randomizer(scrolls.uncleanScrolls)}`;
      }
      break;
    case ('UNCLEAN'):
      result = `Unclean Scroll of ${randomizer(scrolls.uncleanScrolls)}`;
      break;
    case ('SACRED'):
      result = `Sacred Scroll of ${randomizer(scrolls.sacredScrolls)}`;
      break;
    case ('FUNGAL'):
      result = `Fungal Scroll of ${randomizer(scrolls.fungalScrolls)}`;
      break;
    case ('OCHRE'):
      result = `Ochre Tablet of ${randomizer(scrolls.ochreTablets)}`;
      break;
    case ('SALT'):
      result = `Salty Scroll of ${randomizer(scrolls.saltyWaterScrolls)}`;
      break;
  }
  return result
}

/**
 * Produces a viable religion for Setting...
 * @returns string
 */
export function generateReligion(): string {
  let result: string = 'religion Error...'
  const trveFaith = flipCoin();

  if (trveFaith) {
    result = 'The One Trve Faith';
  } else {
    // TODO: Move this to JSON
    const otherReligions: string[] = [
      'a curiously observant wick-head',
      'a false goblin idol',
      'a particularly strong pale-one',
      'a strange deamon of some sort',
      'an earthbound cult leader who claims to be a god',
      'IT, the Deep Leviathan of Salt',
      'MIND, The Unknoable Ochre Thinker',
      'MOON, keeper of dark secrets, arcane change, and miserable fungus',
      'some eldritch dead god long forgotten',
      'SUN, THESUNTHESUNTHESUN',
      'THEY, the Blasphemous one-headed Basilisk',
    ]
    result = randomizer(otherReligions);
  }
  return result;
}

/**
 * Generates Gear B: Some random junk you start with. 
 * @param presence number
 * @param scollType string
 * @returns EquipmentCVB
 */
export function generateGearB(presence: number, scrollType: string): EquipmentCVB {

  let result: EquipmentCVB = {
    equipment: [],
    companionVehilceBag: []
  }
  let gearBRoll: number;

  if (scrollType == 'NONE') {
    gearBRoll = dieRoll(11);
  } else {
    gearBRoll = dieRoll(12);
  }

  switch (gearBRoll) {
    case 1:
      result.equipment.push('Handcuffs (no key)');
      break;
    case 2:
      const candleCount: number = 5 + presence
      result.equipment.push('Candles (x5)');
      if (candleCount > 5) {
        result.equipment.push(`Candles (x${candleCount - 5}`);
      }
      break;
    case 3:
      result.equipment.push('Manacles, and their key');
      break;
    case 4:
      result.equipment.push('5 iron spikes, one per limb and one for your neck');
      break;
    case 5:
      result.equipment.push('Jewelers Tools');
      break;
    case 6:
      result.equipment.push(`Rope (30ft) tied around you`);
      break;
    case 7:
      result.equipment.push('Spyglass');
      break;
    case 8:
      result.equipment.push('Crowbar, d3');
      break;
    case 9:
      result.companionVehilceBag.push(`Affectionate Dead Crow, ${generateName()} ${dieRoll(4) + 2} HP`);
      break;
    case 10:
      result.equipment.push(`Communune Waffers (${dieRoll(8)}x)`)
      break;
    case 11:
      result.equipment.push(`Net`);
      break;
    case 12:
      result.equipment.push(genearteScroll(scrollType));
      break;
  }
  return result
}

/**
 * Generates Gear C: Some random junk you start with. 
 * @param presence number
 * @param scollType string
 * @returns EquipmentCVB
 */
export function generateGearC(presence: number, scrollType: string): EquipmentCVB {

  let result: EquipmentCVB = {
    equipment: [],
    companionVehilceBag: []
  };
  let gearCRoll: number;

  if (scrollType == 'NONE') {
    gearCRoll = dieRoll(11);
  } else {
    gearCRoll = dieRoll(12);
  }

  switch (gearCRoll) {
    case 1:
      result.equipment.push(`20 ft length of chain`);
      break;
    case 2:
      const candleCount: number = 5 + presence
      result.equipment.push('Candles (x5)');
      if (candleCount > 5) {
        result.equipment.push(`Candles (x${candleCount - 5}`);
      }
      break;
    case 3:
      result.equipment.push(`Manacles, and their key`);
      break;
    case 4:
      result.equipment.push(`A prayer-book for ${generateReligion()}`);
      break;
    case 5:
      result.equipment.push('Hairpins you can use as Lockpicks');
      break;
    case 6:
      result.equipment.push(`Brazier`);
      break;
    case 7:
      result.equipment.push('Bottle of Hemlock (DC 14 Toughness resists, d10 damage)');
      break;
    case 8:
      result.equipment.push(`Elegant perfume (${dieRoll(4)} doses): worth 25s`);
      break;
    case 9:
      result.equipment.push('Urn of Ashes, that remain warm');
      break;
    case 10:
      result.equipment.push(`Silver Symbol of ${generateReligion()}`)
      break;
    case 11:
      result.equipment.push('Bottle of Fine Wine');
      break;
    case 12:
      result.equipment.push(genearteScroll(scrollType));
      break;
  }
  return result
}

/**
 * Generates Weapon.
 * @param weaponDie: number
 * @param presence: number
 * @returns string
 */
export function generateWeapon(weaponDie: number, presence: number): string {
  if(weaponDie == 0) {return ""} 
  const weaponRoll: number = dieRoll(weaponDie) - 1;
  return weapons[weaponRoll];
}

/**
 * Generates Armor.
 * @param armorDie: number
 * @returns string
 */
export function generateArmor(armorDie: number): string  {
  const armorRoll: number = dieRoll(armorDie);
  const result = randomizer(armor[`tier${armorRoll - 1}`]);

  return result
}

/**
 * Takes in the base-classes' silver info, rolls for silver and converts it to 50 silver pouches.
 * @param numberDice: number
 * @param dieSize: number
 * @param multiplier: number
 * 
 * @returns string[]
 */
function generateSilver(numberDice: number, dieSize: number, multiplier: number): string[] {

  const result: string[] = [];
  const silverCount: number = (diceRoll(numberDice, dieSize) * multiplier)
  const silverQuotient = Math.floor(silverCount / 50);
  const silverRemainder = silverCount % 50;
  for (let i = 0; i < silverQuotient; i++) {
    result.push('A small pouch of 50 silver coins');
  }
  if (silverRemainder > 0) {
    result.push(`A small pouch of ${silverRemainder} silver coins`)
  }

  return result
}

/**
 * Edits EquipmentCVB, returning an array of strings with !variables! replaced; !name!, !scroll!, !weapon!
 * @param string[],
 * @returns string[]
 */
 function gearBangVarReplaceent(gearList: string[], presence: number): string[] {

  const result: string[] = gearList.map(gearItem => {
    const nameReplaced: string = gearItem.replace('!name!', `${generateName()}`);
    const scrollReplaced: string = nameReplaced.replace('!scroll!', `${genearteScroll('ANY')}`);
    const uncleanReplaced: string = scrollReplaced.replace('!unclean!', `${genearteScroll('UNCLEAN')}`);
    const weaponReplaced = uncleanReplaced.replace('!weapon!', generateWeapon(8, presence));
    return weaponReplaced; 
  });

  return result;
}

/**
 * Build a full character.
 */
export function generateDeadGirlCharacter(): FullDeadGirlCharacter {
  const baseName: string = `${generateName()} ${generateName()}`;
  const baseClassObj: DeadGirlClassObj = generateDeadGirlClass();
  const baseClass: DeadGirlClass = baseClassObj.charClass;
  const baseClassName: string = baseClassObj.className;
  const classDesc: string = baseClass.desc;
  const scar: string = randomizer(scars);
  const graveMark: string = randomizer(graveMarks);
  const strength: number = generateAbility(baseClass.strMod);
  const agility: number = generateAbility(baseClass.aglMod);
  const presence: number = generateAbility(baseClass.preMod);
  const toughness: number = generateAbility(baseClass.tghMod);
  const hitPoints: number = dieRoll(baseClass.HD) + toughness;
  const charScrollType: string = baseClass.scrollType;
  const omens: number = baseClass.omensDie;
  const silverPouches: string[] = generateSilver(baseClass.silver.numberDice, baseClass.silver.dieSize, baseClass.silver.multiplier);
  const charGearA: EquipmentCVB = generateGearA();
  const charGearB: EquipmentCVB = generateGearB(presence, charScrollType);
  const charGearC: EquipmentCVB = generateGearC(presence, charScrollType);
  const charWeapon: string = generateWeapon(baseClass.weaponDie, presence);
  const charArmor: string = generateArmor(baseClass.armorDie);
  const inventoryCount: number = 8 + strength;
  const currentPowers: Power[] = randomizerCount(baseClass.powers.listy, baseClass.powers.number);
  const totalFeatures: Power[] = baseClass.features.concat(currentPowers);

  // Compile Gear
  let charEquipment: string[] = [
    charWeapon, 
    charArmor,
    ...charGearA.equipment,
    ...charGearB.equipment,
    ...charGearC.equipment
  ];
  console.log(totalFeatures);
  totalFeatures.forEach(f => charEquipment.push(...f.featureEquipmentCVB.equipment))
  charEquipment.push(...silverPouches)

  // Compile Bags, Companions, and Vehicles
  let charCVB: string[] = [
    ...charGearA.companionVehilceBag,
    ...charGearB.companionVehilceBag,
    ...charGearC.companionVehilceBag,
  ]

  totalFeatures.forEach(f => charCVB.push(...f.featureEquipmentCVB.companionVehilceBag));
  // Replace Bang Variables (!var!) in gear strings
  charEquipment = gearBangVarReplaceent(charEquipment, presence);
  charCVB = gearBangVarReplaceent(charCVB, presence);

  // Now put it all togetehr
  const result: FullDeadGirlCharacter = {
    name: baseName,
    className: baseClassName,
    classDescription: classDesc,
    scar: scar,
    graveMark: graveMark,
    hitPoints: hitPoints,
    strength: strength,
    agility: agility,
    presence: presence,
    toughness: toughness,
    features: totalFeatures,
    omens: `${dieRoll(omens)} (d${omens})`,
    equipment: charEquipment,
    companionVehicles: charCVB,
    weapon: charWeapon,
    armor: charArmor,
    inventoryCount: inventoryCount
  }

  console.log(result);

  return result
}

generateDeadGirlCharacter();
