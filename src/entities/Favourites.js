import LocalStorage from '@/entities/LocalStorage';
import { getIndex, hasValue } from '@/utilities/helpers';

export default class Favourites {
  static #get() {
    return LocalStorage.get('favourites') ?? [];
  }

  static save(newFavourite) {
    const favourites = Favourites.#get();
    favourites.push(newFavourite);
    LocalStorage.set('favourites', favourites);
  }

  static findIndexByRequestAndUserId(request, userId) {
    const favourites = Favourites.#get();
    return favourites.findIndex((el) => (
      el.request === request && el.userId === userId
    ));
  }

  static update(idx, favourite) {
    const favourites = Favourites.#get();
    favourites[idx] = favourite;
    LocalStorage.set('favourites', favourites);
  }

  static remove(idx) {
    const favourites = Favourites.#get();
    favourites.splice(idx, 1);
    LocalStorage.set('favourites', favourites);
  }

  static getByUserId(userId) {
    const favourites = Favourites.#get();
    return favourites.filter((favourite) => favourite.userId === userId);
  }

  static checkNameUnique(favourites, value) {
    return !hasValue(favourites, 'name', value);
  }

  static checkRequestUnique(favourites, value) {
    return !hasValue(favourites, 'request', value);
  }

  static getIndex(field, value, userId) {
    const favourites = Favourites.getByUserId(userId);
    return getIndex(favourites, field, value);
  }
}
