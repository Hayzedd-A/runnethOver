export const required = (v, msg = 'This field is required') =>
  (v === 0 || v) && String(v).trim() !== '' ? null : msg;

export const email = (v, msg = 'Please enter a valid email') =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase()) ? null : msg;

export const minLength =
  (n) =>
  (v, msg = `Must be at least ${n} characters`) =>
    String(v || '').length >= n ? null : msg;

export function validate(fields, rules) {
  const errors = {};
  Object.entries(rules).forEach(([key, validators]) => {
    for (const fn of validators) {
      const err = fn(fields[key]);
      if (err) {
        errors[key] = err;
        break;
      }
    }
  });
  return errors;
}
