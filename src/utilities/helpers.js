export function hasValue(array, objKey, value) {
  return array.some((el) => el[objKey] === value);
}

export function getIndex(array, objKey, value) {
  return array.findIndex((el) => el[objKey] === value);
}
