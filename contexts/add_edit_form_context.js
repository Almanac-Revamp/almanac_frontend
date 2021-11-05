import _ from "lodash";
import { makeAutoObservable } from "mobx";
import { useRouter } from "next/dist/client/router";
import Router from "next/dist/server/router";
import React, { createContext } from "react";
import { getClasses, getHeroById } from "../services/get";
import { upload } from "../services/post";
import { edit } from "../services/put";

class Stats {
  name;
  base;
  growth;

  constructor(data) {
    if(typeof data === 'string'){
      this.name = data;
      this.base = "";
      this.growth = "";
    } else {
      this.name = data.name ?? "";
      this.base = data.base ?? "";
      this.growth = data.growth ?? "";
    }
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
    this.width = data.width ?? "";
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
    this.attackDamage = data.attackDamage ??  "";
    this.attackSpeed = data.attackSpeed ?? "";
    this.criticalStrikeChance = data.criticalStrikeChance ?? "";
    this.armor = data.armor ?? "";
    this.magicResistance = data.magicResistance ?? "";
    this.movementSpeed = data.movementSpeed ?? "";
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
    if(typeof data === 'string'){
      this.key = data;
      this.value = "";
    } else {
      this.key = data.key ?? data.name ?? "";
      this.value = data.value ?? "";
    }
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
    this.header = data.header ? new Header(data.header) : new Header({});
    this.name = data.name ?? "";
    this.desc = data.desc ?? "";
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
    this.resource = data.resource ?? 'Mana';
    this.attackType = data.attackType ?? '';
    this.className = data.className ?? '';
    this.stats = data.stats ? _.map(data.stats, (stat) => new Stats(stat)) : [
      new Stats('Health'), new Stats('Mana'), new Stats('Stamina'), new Stats('Health Regen'),
      new Stats('Mana Regen'), new Stats('Stamina Regen'), new Stats('Secondary Bar'), new Stats('Armor'),
      new Stats('Attack Damage'), new Stats('Magic Resist'), new Stats('Crit Damage'), new Stats('Move Speed'),
      new Stats('Range')
    ];
    this.attackSpeed = data.attackSpeed ? _.map(data.attackSpeed, (stat) => new Scaling(stat)) : [
      new Scaling('Base Attack Speed'), new Scaling('Missile Speed'), new Scaling('Attack Speed Ratio'), new Scaling('Bonus Attack Speed')
    ];
    this.ratings = data.ratings ? _.map(data.ratings, (stat) => new Scaling(stat)) : [
      new Scaling('Damage'), new Scaling('Toughness'), new Scaling('Control'), new Scaling('Mobility'), new Scaling('Utility'), new Scaling('Difficulty')
    ];
    this.abilities = data.abilities ? _.map(data.abilities, (stat) => new Ability(stat)) : [
      new Ability('P'), new Ability('Q'), new Ability('W'), new Ability('E'), new Ability('R')
    ];
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
  toggleStat;
  toggleAs;
  toggleRatings;

  constructor() {
    this.hero = null;
    // this.hero = {};
    this.classes = [];
    this.abilDis = 'P';
    this.isLoad = false;
    this.toggleStat = false;
    this.toggleAs = false;
    this.toggleStat = false;
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

  async upload(router) {
    try {
      const res = await upload(this.hero);
      if(res.status === 200){
        router.push(`/`);
      }
    } catch (err) {
      console.log(err)
    }
  }

  async edit(router, id) {
    try {
      console.log(this.hero)
      const res = await edit(this.hero, id);
      if(res.status === 200){
        router.push(`/show/${id}`);
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const addEditFormContext = createContext(new AddEditFormContext());