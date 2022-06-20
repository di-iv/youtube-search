import LocalStorage from '@/services/LocalStorage';
import { hasValue, getIndex } from '@/utilities/helpers';

export default class Favourites {
  static save(newFavourite) {
    const favourites = LocalStorage.get('favourites') ?? [];
    const updatedFavourites = [...favourites, newFavourite];
    LocalStorage.set('favourites', updatedFavourites);
  }

  static update(updatedFavourites) {
    LocalStorage.set('favourites', updatedFavourites);
  }

  static getFromStorageByUserId(userId) {
    if (LocalStorage.get('favourites')) {
      return LocalStorage.get('favourites').filter((favourite) => favourite.userId === userId);
    }
    return null;
  }

  static checkNameUnique(favourites, value) {
    return !hasValue(favourites, 'name', value);
  }

  static checkRequestUnique(favourites, value) {
    return !hasValue(favourites, 'request', value);
  }

  static getIndex(field, value, userId) {
    const favourites = Favourites.getFromStorageByUserId(userId);
    return getIndex(favourites, field, value);
  }
}
