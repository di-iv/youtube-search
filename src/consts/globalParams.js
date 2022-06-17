const navs = [
  {
    title: 'Поиск',
    link: '/search',
  },
  {
    title: 'Избранное',
    link: '/favourites',
  },
];
const youtubeOrderOptions = [
  { value: 'null', text: 'Без сортировки' },
  { value: 'date', text: 'Дате' },
  { value: 'rating', text: 'Рейтингу' },
  { value: 'title', text: 'Алфавиту' },
];
const authErrors = {
  INVALID_EMAIL: 'Неверный email',
  EMAIL_NOT_FOUND: 'Пользователь не найден',
  INVALID_PASSWORD: 'Неверный пароль',
  EMAIL_EXISTS: 'Такой email уже существует',
  MISSING_EMAIL: 'Не введен email',
  MISSING_PASSWORD: 'Не введен пароль',
  'WEAK_PASSWORD : Password should be at least 6 characters': 'Пароль должен быть не менее 6 символов',
};
const apiUrls = {
  youtube: 'https://youtube.googleapis.com/youtube/v3/',
  auth: 'https://identitytoolkit.googleapis.com/v1/',
};
const generalErrors = {
  nameExist: 'Такое имя уже существует',
  requestExist: 'Такой запрос уже существует',
};
const youtubeVideoLink = 'https://www.youtube.com/watch?v=';

export {
  navs, youtubeOrderOptions, authErrors, apiUrls, generalErrors, youtubeVideoLink,
};
