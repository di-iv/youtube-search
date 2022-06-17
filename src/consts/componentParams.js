const button = {
  sizes: ['small', 'medium', 'large'],
  styles: ['fill', 'outline', 'link'],
  colors: ['primary', 'danger'],
  types: ['button', 'submit'],
  defaultType: 'button',
};
const input = {
  sizes: ['small', 'large'],
  labelColors: ['text-grey'],
  defaultType: 'text',
  defaultSize: 'small',
};
const searchForm = {
  sizes: ['small', 'large'],
  defaultSize: 'small',
  icon: 'Heart',
};
const select = {
  defaultLabel: 'Сортировать по',
};
const formGroup = {
  defaultTag: 'div',
};
const inputPassword = {
  types: {
    password: 'password',
    text: 'text',
  },
  icons: {
    hidden: 'EyeOff',
    visible: 'Eye',
  },
};

export {
  button, input, searchForm, select, formGroup, inputPassword,
};
