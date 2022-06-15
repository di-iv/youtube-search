import LocalStorage from '@/services/LocalStorage';
import { hasValue, getIndex } from '@/utilities/helpers';

export default class Favourites {
  static addToStorage(data) {
    LocalStorage.set('favourites', data);
  }

  static getFromStorageByUserId(userId) {
    if (LocalStorage.get('favourites')) {
      return LocalStorage.get('favourites').filter((favourite) => favourite.userId === userId);
    }
    return null;
  }

  static checkUniq(favourites, field, value) {
    return !hasValue(favourites, field, value);
  }

  static getIndex(field, value) {
    const favourites = Favourites.getFromStorageByUserId();
    return getIndex(favourites, field, value);
  }
}
