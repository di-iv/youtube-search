const params = {
  navs: [
    {
      title: 'Поиск',
      link: '/search',
    },
    {
      title: 'Избранное',
      link: '/favourites',
    },
  ],
  button: {
    sizes: ['small', 'medium', 'large'],
    style: ['fill', 'outline', 'link'],
    colors: ['primary', 'danger'],
    types: ['button', 'submit'],
  },
  input: {
    sizes: ['small', 'large'],
    labelColors: ['border-color'],
  },
  searchForm: {
    sizes: ['small', 'large'],
  },
  select: {
    options: [
      { value: 'null', text: 'Без сортировки' },
      { value: 'date', text: 'Дате' },
      { value: 'rating', text: 'Рейтингу' },
      { value: 'title', text: 'Алфавиту' },
    ],
  },
  authErrors: {
    INVALID_EMAIL: 'Неверный email',
    EMAIL_NOT_FOUND: 'Пользователь не найден',
    INVALID_PASSWORD: 'Неверный пароль',
  },
};

export default params;
