import LocalStorage from '@/services/LocalStorage';
import { hasValue, getIndex } from '@/utilities/helpers';

export default class Favourites {
  static addToStorage(data) {
    LocalStorage.set('favourites', data);
  }

  static getFromStorageByUserId(userId) {
    return LocalStorage.get('favourites').filter((favourite) => favourite.userId === userId);
  }

  static checkUniq(favourites, field, value) {
    return !hasValue(favourites, field, value);
  }

  static getIndex(field, value) {
    const favourites = Favourites.getFromStorageByUserId();
    return getIndex(favourites, field, value);
  }
}
