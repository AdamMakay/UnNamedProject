export const classifyNumbers = (numbers) => {
  const results = [];

  for (const number of numbers) {
    if (!Number.isInteger(number)) {
      results.push(`${number}: not an integer, so prime/even/odd checks don't apply.`);
      continue;
    }

    let prime = number > 1;
    for (let divisor = 2; divisor < number; divisor++) {
      if (number % divisor === 0) { prime = false; break; }
    }

    let label = number + ": ";
    if (prime) label += "prime; ";
    else if (number > 1) label += "composite; ";

    if (number % 2 === 0) label += "even";
    else label += "odd";

    results.push(label);
  }

  return results;
};


export const convertNumbers = (numbers) => {
  const results = [];

  for (const number of numbers) {
    let letters = "";
    if (Number.isInteger(number) && number >= 1 && number <= 26) {
      letters = String.fromCharCode(64 + number);
    } else { letters = "-"; }

    results.push(`${number}: binary ${number.toString(2)}, hex ${number.toString(16)}, letter ${letters}`);
  }

  return results;
};


export const transformNumbers = (numbers, transformation) => {
  const result = [];

  switch (transformation) {
    case "double":
      for (const number of numbers) result.push(number * 2);
      break;
    case "square":
      for (const number of numbers) result.push(Math.pow(number, 2));
      break;
    case "reverse":
      for (let i = numbers.length - 1; i >= 0; i--) result.push(numbers[i]);
      break;
    case "ascending":
      for (const number of numbers) result.push(number);
      result.sort((a, b) => a - b);
      break;
    case "descending":
      for (const number of numbers) result.push(number);
      result.sort((a, b) => b - a);
      break;
    case "cumulative":
      let total = 0;
      for (const number of numbers) {
        total += number;
        result.push(total);
      }
      break;
    default:
      return numbers;
  }

  return result;
};

