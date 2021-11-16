import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getClasses, getFilteredHeroes, getHeroes } from "../services/get";

class HomeContext {
  classes;
  heroes;
  searchWord;
  range;
  chosenClass;
  classArray;

  constructor() {
    this.classes = [];
    this.heroes = [];
    this.searchWord = '';
    this.range = '';
    this.chosenClass = '';
    this.classArray = [];
    makeAutoObservable(this);
  }

  setValue(key, value){
    this[key] = value;
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

  async prepareHeroes() {
    try {
      const res = await getHeroes();
      if(res.status === 200){
        this.setValue('heroes', res.data);
      }
    } catch (err) {
      console.log(err)
    }
  }

  async prepareFilteredHeroes() {
    try {
      const res = await getFilteredHeroes(this.searchWord, this.classArray, this.range);
      if(res.status === 200){
        this.setValue('heroes', res.data);
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const homeContext = createContext(new HomeContext());