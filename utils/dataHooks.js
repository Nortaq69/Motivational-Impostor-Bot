// utils/dataHooks.js

/**
 * createState - creates a reactive state object
 * @param {any} initial
 * @returns {[() => any, (v: any) => void, (fn: (v: any) => void) => void]}
 */
export function createState(initial) {
  let value = initial;
  const listeners = [];
  function get() { return value; }
  function set(v) { value = v; listeners.forEach(fn => fn(v)); }
  function subscribe(fn) { listeners.push(fn); }
  return [get, set, subscribe];
}

/**
 * useState - simple state for components
 * @param {any} initial
 * @returns {[() => any, (v: any) => void]}
 */
export function useState(initial) {
  let value = initial;
  function get() { return value; }
  function set(v) { value = v; }
  return [get, set];
}
