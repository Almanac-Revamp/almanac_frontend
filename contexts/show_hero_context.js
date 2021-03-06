import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getHeroById, getThumbnail } from "../services/get";
import { deleteHero } from "../services/delete";

class ShowHeroContext {
  hero;
  mode;
  isLoad;
  abilDis;
  isLoad;
  image;

  constructor() {
    this.hero = null;
    this.mode = true;
    this.isLoad = false;
    this.abilDis = 'P';
    this.isLoad = false;
    this.image = '';
    makeAutoObservable(this);
  }

  setValue(key, value){
    this[key] = value;
  }

  async prepareHero(id) {
    try {
      const res = await getHeroById(id);
      if(res.status === 200){
        this.setValue('hero', res.data);
        this.setValue('image', getThumbnail(this.hero.thumbName));
        this.setValue('isLoad', true);
      }
    } catch (err) {
      console.log(err)
    }
  }

  async deleteHero(id, router) {
    try {
      const res = await deleteHero(id);
      if(res.status === 200){
        router.push(`/`);
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const showHeroContext = createContext(new ShowHeroContext());