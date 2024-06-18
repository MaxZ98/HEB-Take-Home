export const validatePIN = (pin: string): boolean => {
  return pin.length === 4 && /^\d+$/.test(pin);
};
