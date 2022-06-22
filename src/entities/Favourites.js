import LocalStorage from '@/entities/LocalStorage';
import { getIndex, hasValue } from '@/utilities/helpers';

export default class Favourites {
  /**
   * Get index of favourite in storage by search request and user id
   * @param {string} request - search request
   * @param {string} userId - authorized user id
   * @returns {number} - index of favourite
   */
  static findIndexByRequestAndUserId(request, userId) {
    const favourites = Favourites.#get();
    return favourites.findIndex((favourite) => (
      favourite.request === request && favourite.userId === userId
    ));
  }

  /**
   * Get list of all favourites
   * @returns {array}
   */
  static #get() {
    return LocalStorage.get('favourites') ?? [];
  }

  /**
   * Get favourites by user id
   * @param {string} userId - authorized user id
   * @returns {Array}
   */
  static getByUserId(userId) {
    const favourites = Favourites.#get();
    return favourites.filter((favourite) => favourite.userId === userId);
  }

  /**
   * Get index of favourite
   * @param {string} field
   * @param {string} value
   * @param {string} userId - authorized user id
   * @returns {Number}
   */
  static getIndex(field, value, userId) {
    const favourites = Favourites.getByUserId(userId);
    return getIndex(favourites, field, value);
  }

  /**
   * Check the name of the favourite for uniqueness
   * @param {array} favourites - list of favourites
   * @param {string} name - name that need to check
   * @returns {boolean}
   */
  static isNameUnique(favourites, name) {
    return !hasValue(favourites, 'name', name);
  }

  /**
   * Check the search request of the favourite for uniqueness
   * @param {array} favourites - list of favourites
   * @param {string} request - search request that need to check
   * @returns {boolean}
   */
  static isRequestUnique(favourites, request) {
    return !hasValue(favourites, 'request', request);
  }

  /**
   * Remove favourite by index
   * @param {number} idx - index of favourite
   */
  static remove(idx) {
    const favourites = Favourites.#get();
    favourites.splice(idx, 1);
    LocalStorage.set('favourites', favourites);
  }

  /**
   * Save favourite
   * @param {object} newFavourite - favourite that need to save
   */
  static save(newFavourite) {
    const favourites = Favourites.#get();
    favourites.push(newFavourite);
    LocalStorage.set('favourites', favourites);
  }

  /**
   * Update storage of favourites
   * @param {number} idx - index of favourite that need to update
   * @param {object} favourite - new favourite
   */
  static update(idx, favourite) {
    const favourites = Favourites.#get();
    favourites[idx] = favourite;
    LocalStorage.set('favourites', favourites);
  }
}
