export const validateMercosul = (value: string) => {
  const regex = /^[A-Z]{3}\d[A-Z0-9]\d{2}$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
};
