import _ from "lodash";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { getClasses, getHeroById } from "../services/get";

class Stats {
  name;
  base;
  growth;

  constructor(data) {
    this.name = data.name ?? "";
    this.base = data.base ?? "";
    this.growth = data.growth ?? "";
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }
}

class Header {
  range;
  targetRange;
  collisionRadius;
  effectRadius;
  tetherRadius;
  width;
  angle;
  speed;
  castTime;
  cost;
  cooldown;
  staticCooldown;
  recharge;
  targetImmunity;

  constructor(data) {
    this.range = data.range ?? "";
    this.targetRange = data.targetRange ?? "";
    this.collisionRadius = data.collisionRadius ?? "";
    this.effectRadius = data.effectRadius ?? "";
    this.tetherRadius = data.tetherRadius ?? "";
    this.angle = data.angle ?? "";
    this.speed = data.speed ?? "";
    this.castTime = data.castTime ?? "";
    this.cost = data.cost ?? "";
    this.cooldown = data.cooldown ?? "";
    this.staticCooldown = data.staticCooldown ?? "";
    this.recharge = data.recharge ?? "";
    this.targetImmunity = data.targetImmunity ?? "";
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }
}

class SummonHeader {
  health;
  attackDamage;
  attackSpeed;
  criticalStrikeChance;
  armor;
  magicResistance;
  movementSpeed;
  range;
  lifespan;

  constructor(data) {
    this.health = data.health ?? "";
    this.attackDamage = data['attack damage'] ?? "";
    this.attackSpeed = data['attack speed'] ?? "";
    this.criticalStrikeChance = data['critical strike chance'] ?? "";
    this.armor = data.armor ?? "";
    this.magicResistance = data['magic resistance'] ?? "";
    this.range = data.range ?? "";
    this.lifespan = data.lifespan ?? "";
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }
}

class Scaling {
  key;
  value;

  constructor(data){
    this.key = data.key ?? "";
    this.value = data.value ?? "";
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }
}

class Summon {
  name;
  desc;
  header;

  constructor(data) {
    this.name = data.name ?? "";
    this.desc = data.desc ?? "";
    this.header = data.header ? new SummonHeader(data.header) : new SummonHeader({});
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }
}

class SubAbility {
  header;
  name;
  desc;
  scaling;

  constructor(data) {
    this.header = new Header(data.header) ?? new Header({});
    this.name = data.name ?? "";
    this.desc = data.desc ?? "";
    this.scaling = data.scaling ? _.map(data.scaling, (scale) => new Scaling(scale)) : [];
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }
}

class Ability {
  slot;
  header;
  name;
  desc;
  scaling;
  subAbility;
  summon;

  constructor(data) {
    if(typeof data === 'string'){
      this.slot = data;
      this.header = new Header({});
      this.name = "";
      this.desc = "";
    } else {
      this.slot = data.slot ?? "";
      this.header = data.header ? new Header(data.header) : new Header({});
      this.name = data.name ?? "";
      this.desc = data.desc ?? "";
      this.scaling = data.scaling ? _.map(data.scaling, (scale) => new Scaling(scale)) : [];
      this.subAbility = data.subAbility ? _.map(data.subAbility, (subAbil) => new SubAbility(subAbil)) : [];
      this.summon = data.summon ? _.map(data.summon, (summ) => new Summon(summ)) : [];
    }
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }
}

class Hero {
  name;
  title;
  resource;
  attackType;
  className;
  stats;
  attackSpeed;
  ratings;
  abilities;

  constructor(data) {
    this.name = data.name ?? '';
    this.title = data.title ?? '';
    this.resource = data.resource ?? '';
    this.attackType = data.attackType ?? '';
    this.className = data.class ?? '';
    this.stats = data.stats ? _.map(data.stats, (stat) => new Stats(stat)) : [];
    this.attackSpeed = data.attackSpeed ? _.map(data.attackSpeed, (stat) => new Stats(stat)) : [];
    this.ratings = data.ratings ? _.map(data.ratings, (stat) => new Stats(stat)) : [];
    this.abilities = data.abilities ? _.map(data.abilities, (stat) => new Ability(stat)) : [new Ability('P'), new Ability('Q'), new Ability('W'), new Ability('E'), new Ability('R')];
    makeAutoObservable(this);
  }
  
  setValue(key, value) {
    this[key] = value;
  }
}

class AddEditFormContext {
  hero;
  classes;
  abilDis;

  constructor() {
    this.hero = new Hero({});
    // this.hero = {};
    this.classes = [];
    this.abilDis = 'P';
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  async prepareHero(id) {
    if(id){
      try {
        const res = await getHeroById(id);
        if(res.status === 200){
          this.setValue('hero', new Hero(res.data));
          console.log(res.data)
          console.log(this.hero)
          // this.setValue('hero', res.data);
          this.setValue('isLoad', true);
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  async prepareClasses() {
    try {
      const res = await getClasses();
      if(res.status === 200){
        this.setValue('classes', res.data);
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const addEditFormContext = createContext(new AddEditFormContext());