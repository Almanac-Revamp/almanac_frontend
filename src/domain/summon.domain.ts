export interface SummonInterface {
  name: string
  desc: string
  header: SummonHeaderInterface
}

export interface SummonHeaderInterface {
  health: string
  attackDamage: string
  attackSpeed: string
  criticalStrikeChance: string
  armor: string
  magicResistance: string
  movementSpeed: string
  range: string
  lifespan: string
}

export class SummonHeader implements SummonHeaderInterface {
  health: string = ''
  attackDamage: string = ''
  attackSpeed: string = ''
  criticalStrikeChance: string = ''
  armor: string = ''
  magicResistance: string = ''
  movementSpeed: string = ''
  range: string = ''
  lifespan: string = ''
}
