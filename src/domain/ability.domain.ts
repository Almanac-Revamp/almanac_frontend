import { ScalingInterface } from './hero.domain'
import { SummonInterface } from './summon.domain'

export enum AbilitySlot {
  PERK = 'P',
  FIRST = 'Q',
  SECOND = 'W',
  THIRD = 'E',
  ULT = 'R'
}

export interface AbilityHeaderInterface {
  range: string
  targetRange: string
  collisionRadius: string
  effectRadius: string
  tetherRadius: string
  width: string
  angle: string
  speed: string
  castTime: string
  cost: string
  cooldown: string
  staticCooldown: string
  recharge: string
  targetImmunity: string
}

export class AbilityHeader implements AbilityHeaderInterface {
  range: string = ''
  targetRange: string = ''
  collisionRadius: string = ''
  effectRadius: string = ''
  tetherRadius: string = ''
  width: string = ''
  angle: string = ''
  speed: string = ''
  castTime: string = ''
  cost: string = ''
  cooldown: string = ''
  staticCooldown: string = ''
  recharge: string = ''
  targetImmunity: string = ''
}

export interface AbilityInterface {
  slot: AbilitySlot
  header: AbilityHeaderInterface
  name: string
  desc: string
  scaling: ScalingInterface[]
  subAbility: SubAbilityInterface[]
  summon: SummonInterface[]
}

export interface SubAbilityInterface {
  header: AbilityHeaderInterface
  name: string
  desc: string
  scaling: ScalingInterface[]
}
