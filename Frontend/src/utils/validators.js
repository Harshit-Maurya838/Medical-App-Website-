export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
  return /^[0-9+\-\s]{8,15}$/.test(phone);
};

export const isValidName = (name) => {
  return /^[a-zA-Z ]{2,}$/.test(name.trim());
};

export const isValidOTP = (otpArray) => {
  return otpArray.every((d) => /^\d$/.test(d));
};