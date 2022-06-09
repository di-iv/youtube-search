import LocalStorage from '@/services/LocalStorage';

export default class Favourites {
  static addToStorage(data) {
    LocalStorage.set('favourites', data);
  }

  static getFromStorage() {
    return LocalStorage.get('favourites');
  }
}
