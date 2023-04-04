import { AttackSpeedScalingType, AttackType, HeroInterface, RatingType, ResourceType, StatList } from '@src/domain/hero.domain'
import { AbilitySlot } from '@src/domain/ability.domain'
import _ from 'lodash'
import { AbilityHeader } from '@src/domain/ability.domain'

export const AbilityDefaultValue: (data: HeroInterface) => HeroInterface = (data) => {
  if (!data)
    return {
      name: '',
      title: '',
      resource: ResourceType.MANA,
      attackType: AttackType.MELEE,
      className: '',
      thumbName: '',
      stats: _.map(StatList, (name) => ({
        name,
        base: name === StatList.CRIT_DAMAGE ? '175%' : '',
        growth: '',
      })),
      ratings: _.map(RatingType, (key) => ({
        key,
        value: '1',
      })),
      attackSpeed: _.map(AttackSpeedScalingType, (key) => ({
        key,
        value: _.includes([AttackSpeedScalingType.MISSILE_SPEED, AttackSpeedScalingType.AS_RATIO], key) ? 'N/A' : '',
      })),
      abilities: _.map(AbilitySlot, (slot) => ({
        slot,
        header: new AbilityHeader(),
        name: '',
        desc: '',
        scaling: [],
        subAbility: [],
        summon: [],
      })),
    }
  return data
}
