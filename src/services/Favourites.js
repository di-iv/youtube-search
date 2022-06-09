import LocalStorage from '@/services/LocalStorage';
import { hasValue, getIndex } from '@/utilities/helpers';

export default class Favourites {
  static addToStorage(data) {
    LocalStorage.set('favourites', data);
  }

  static getFromStorage() {
    return LocalStorage.get('favourites');
  }

  static checkUniq(favourites, field, value) {
    return !hasValue(favourites, field, value);
  }

  static getIndex(field, value) {
    const favourites = Favourites.getFromStorage();
    return getIndex(favourites, field, value);
  }
}
