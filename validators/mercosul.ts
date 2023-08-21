export const validateMercosul = (value: string) => {
  if (!value) {
    return true;
  }
  const govPlate = /^(001|002|003)/;
  const regex = /^[A-Z]{3}\d[A-Z0-9]\d{2}$/;
  if (govPlate.test(value)) {
    return true;
  }
  if (!regex.test(value)) {
    return false;
  }
  return true;
};
