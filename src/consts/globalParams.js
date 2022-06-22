const navs = [
  {
    title: 'nav.search',
    link: '/search',
  },
  {
    title: 'nav.favourites',
    link: '/favourites',
  },
];
const youtubeOrderOptions = [
  { value: 'relevance', text: 'youtubeOrder.noOrder' },
  { value: 'date', text: 'youtubeOrder.date' },
  { value: 'rating', text: 'youtubeOrder.rating' },
  { value: 'title', text: 'youtubeOrder.alphabet' },
];
const defaultYoutubeOrder = 'relevance';
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
const youtubeResultsRange = {
  min: 1,
  max: 50,
};
const locales = ['ru', 'en'];

export {
  navs,
  youtubeOrderOptions,
  authErrors,
  apiUrls,
  generalErrors,
  youtubeVideoLink,
  youtubeResultsRange,
  defaultYoutubeOrder,
  locales,
};
