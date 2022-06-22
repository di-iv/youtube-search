import LocalStorage from '@/entities/LocalStorage';
import { getIndex, hasValue } from '@/utilities/helpers';

export default class Favourites {
  static findIndexByRequestAndUserId(request, userId) {
    const favourites = Favourites.#get();
    return favourites.findIndex((favourite) => (
      favourite.request === request && favourite.userId === userId
    ));
  }

  static #get() {
    return LocalStorage.get('favourites') ?? [];
  }

  static getByUserId(userId) {
    const favourites = Favourites.#get();
    return favourites.filter((favourite) => favourite.userId === userId);
  }

  static getIndex(field, value, userId) {
    const favourites = Favourites.getByUserId(userId);
    return getIndex(favourites, field, value);
  }

  static isNameUnique(favourites, value) {
    return !hasValue(favourites, 'name', value);
  }

  static isRequestUnique(favourites, value) {
    return !hasValue(favourites, 'request', value);
  }

  static remove(idx) {
    const favourites = Favourites.#get();
    favourites.splice(idx, 1);
    LocalStorage.set('favourites', favourites);
  }

  static save(newFavourite) {
    const favourites = Favourites.#get();
    favourites.push(newFavourite);
    LocalStorage.set('favourites', favourites);
  }

  static update(idx, favourite) {
    const favourites = Favourites.#get();
    favourites[idx] = favourite;
    LocalStorage.set('favourites', favourites);
  }
}
