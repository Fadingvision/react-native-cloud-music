// type checking
const is = {
  string: s => typeof s === 'string',
  function: s => s instanceof Function,
  object: s => Object.prototype.toString.call(s) === '[object Object]',
  array: s => Array.isArray(s),
  number: s => typeof s === 'number',
  empty: s => s === null || typeof s === 'undefined' || s === '',
}

export default is;
