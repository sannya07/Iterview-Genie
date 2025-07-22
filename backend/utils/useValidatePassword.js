import validator from 'validator';

export const passwordcheck = (password) => {

  // Basic password rules – customize as needed
  if (!password || !validator.isLength(password, { min: 8 })) {
    throw new Error("Password must be at least 8 characters long");
  }

  // Optionally: add custom checks (like at least one number, one symbol, etc.)
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain at least one lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain at least one digit");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    throw new Error("Password must contain at least one special character");
  }

  const pass = password; // set acc to pass
  return pass;
};
