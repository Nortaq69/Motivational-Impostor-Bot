// utils/validateInput.js

/**
 * validateInput - validates a string input
 * @param {string} value
 * @param {Object} opts - { min: number, max: number, pattern: RegExp }
 * @returns {Object} { valid: boolean, error: string|null }
 */
export function validateInput(value, opts = {}) {
  if (!value || value.trim() === '') return { valid: false, error: 'Input required.' };
  if (opts.min && value.length < opts.min) return { valid: false, error: `Minimum ${opts.min} characters.` };
  if (opts.max && value.length > opts.max) return { valid: false, error: `Maximum ${opts.max} characters.` };
  if (opts.pattern && !opts.pattern.test(value)) return { valid: false, error: 'Invalid format.' };
  return { valid: true, error: null };
}
