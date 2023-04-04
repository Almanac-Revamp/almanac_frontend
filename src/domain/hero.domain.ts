//---------------------
// ENUMS

import { AbilityInterface } from './ability.domain'

//---------------------
export enum ResourceType {
  MANA = 'Mana',
  STAMINA = 'Stamina',
  NONE = 'N/A',
}

export enum AttackType {
  MELEE = 'Melee',
  RANGED = 'Ranged',
}

export enum StatList {
  HEALTH = 'Health',
  MANA = 'Mana',
  STAMINA = 'Stamina',
  HEALTH_REGEN = 'Health Regen',
  MANA_REGEN = 'Mana Regen',
  STAMINA_REGEN = 'Stamina Regen',
  SECONDARY_BAR = 'Secondary Bar',
  ARMOR = 'Armor',
  ATTACK_DAMAGE = 'Attack Damage',
  MAGIC_RESIST = 'Magic Resist',
  CRIT_DAMAGE = 'Crit Damage',
  MOVE_SPEED = 'Move Speed',
  RANGE = 'Range',
}

export enum AttackSpeedScalingType {
  BASE_AS = 'Base Attack Speed',
  MISSILE_SPEED = 'Missile Speed',
  AS_RATIO = 'Attack Speed Ratio',
  BONUS_AS = 'Bonus Attack Speed',
}

export enum RatingType {
  DAMAGE = 'Damage',
  TOUGHNESS = 'Toughness',
  CONTROL = 'Control',
  MOBILITY = 'Mobility',
  UTILITY = 'Utility',
  DIFFICULTY = 'Difficulty',
}

//---------------------
// INTERFACES
//---------------------
export interface StatInterface {
  name: string
  base: string
  growth: string
}

export interface ScalingInterface {
  key: string
  value: string
}

export interface HeroInterface {
  name: string
  title: string
  resource: ResourceType
  attackType: AttackType
  className: string
  stats: StatInterface[]
  attackSpeed: ScalingInterface[]
  ratings: ScalingInterface[]
  abilities: AbilityInterface[]
  thumbName: string
}
