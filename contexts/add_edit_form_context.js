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
    this.range = data.range ? decodeURIComponent(data.range) : "";
    this.targetRange = data['target range'] ? decodeURIComponent(data['target range']) : "";
    this.collisionRadius = data['collision radius'] ? decodeURIComponent(data['collision radius']) : "";
    this.effectRadius = data['effect radius'] ? decodeURIComponent(data['effect radius']) : "";
    this.tetherRadius = data['tether radius'] ? decodeURIComponent(data['tether radius']) : "";
    this.width = data.width ? decodeURIComponent(data.width) : "";
    this.angle = data.angle ? decodeURIComponent(data.angle) : "";
    this.speed = data.speed ? decodeURIComponent(data.speed) : "";
    this.castTime = data['cast time'] ? decodeURIComponent(data['cast time']) : "";
    this.cost = data.cost ? decodeURIComponent(data.cost) : "";
    this.cooldown = data.cooldown ? decodeURIComponent(data.cooldown) : "";
    this.staticCooldown = data['static cooldown'] ? decodeURIComponent(data['static cooldown']) : "";
    this.recharge = data.recharge ? decodeURIComponent(data.recharge) : "";
    this.targetImmunity = data['target immunity'] ? decodeURIComponent(data['target immunity']) : "";
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
    this.health = data.health ? decodeURIComponent(data.health) : "";
    this.attackDamage = data['attack damage'] ? decodeURIComponent(data['attack damage']) : "";
    this.attackSpeed = data['attack speed'] ? decodeURIComponent(data['attack speed']) : "";
    this.criticalStrikeChance = data['critical strike chance'] ? decodeURIComponent(data['critical strike chance']) : "";
    this.armor = data.armor ? decodeURIComponent(data.armor) : "";
    this.magicResistance = data['magic resistance'] ? decodeURIComponent(data['magic resistance']) : "";
    this.range = data.range ? decodeURIComponent(data.range) : "";
    this.lifespan = data.lifespan ? decodeURIComponent(data.lifespan) : "";
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
    this.value = data.value ? decodeURIComponent(data.value) : "";
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
    this.desc = data.desc ? decodeURIComponent(data.desc) : "";
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
    this.header = data.header ? new Header(data.header) : new Header({});
    this.name = data.name ?? "";
    this.desc = data.desc ? decodeURIComponent(data.desc) : "";
    this.scaling = data.scaling ? _.map(data.scaling, (scale) => new Scaling(scale)) : [];
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  addScaling() {
    this.scaling.push(new Scaling({}))
  }

  shiftLeft = (index) => {
    let buffer = this.scaling[index];
    this.scaling[index] = this.scaling[index - 1];
    this.scaling[index - 1] = buffer;
  }

  shiftRight = (index) => {
    let buffer = this.scaling[index];
    this.scaling[index] = this.scaling[index + 1];
    this.scaling[index + 1] = buffer;
  }

  delScale = (index) => {
    this.scaling.splice(index, 1);
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
      this.scaling = [];
      this.subAbility = [];
      this.summon = [];
    } else {
      this.slot = data.slot ?? "";
      this.header = data.header ? new Header(data.header) : new Header({});
      this.name = data.name ?? "";
      this.desc = data.desc ? decodeURIComponent(data.desc) : "";
      this.scaling = data.scaling ? _.map(data.scaling, (scale) => new Scaling(scale)) : [];
      this.subAbility = data.subAbility ? _.map(data.subAbility, (subAbil) => new SubAbility(subAbil)) : [];
      this.summon = data.summon ? _.map(data.summon, (summ) => new Summon(summ)) : [];
    }
    makeAutoObservable(this);
  }

  setValue(key, value) {
    this[key] = value;
  }

  addSubAbility() {
    this.subAbility.push(new SubAbility({}));
  }

  addSummon() {
    this.summon.push(new Summon({}));
  }

  addScaling() {
    this.scaling.push(new Scaling({}))
  }

  shiftLeft = (index) => {
    let buffer = this.scaling[index];
    this.scaling[index] = this.scaling[index - 1];
    this.scaling[index - 1] = buffer;
  }

  shiftRight = (index) => {
    let buffer = this.scaling[index];
    this.scaling[index] = this.scaling[index + 1];
    this.scaling[index + 1] = buffer;
  }

  delItem = (key, index) => {
    this[key].splice(index, 1);
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
  isLoad;

  constructor() {
    this.hero = null;
    // this.hero = {};
    this.classes = [];
    this.abilDis = 'P';
    this.isLoad = false;
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
          // console.log(res.data)
          // console.log(this.hero)
          // this.setValue('hero', res.data);
          this.setValue('isLoad', true);
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      this.setValue('hero', new Hero({}));
      this.setValue('isLoad', true);
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