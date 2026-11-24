export const getNumbersFromInput = (text) => {
  const parts = text.trim().split(/[\s,;]+/);
  const numbers = [];

  for (const part of parts) {
    if (part === "") continue;

    const number = Number(part);
    if (!Number.isNaN(number) && Number.isFinite(number)) {numbers.push(number); }
    else { return null; }
  }

  if (numbers.length === 0) return null;
  return numbers;
};
