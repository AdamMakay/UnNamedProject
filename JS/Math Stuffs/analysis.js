export const getStatistics = (numbers) => {
  let sum = 0;
  let smallest = numbers[0];
  let largest = numbers[0];

  for (const number of numbers) {
    sum += number;
    if (number < smallest) smallest = number;
    if (number > largest) largest = number;
  }
  // sum = Math.sum(...numbers);
  // smallest = Math.min(...numbers);
  // largest = Math.max(...numbers);

  const average = sum / numbers.length;
  const sorted = [...numbers].sort((a, b) => a - b);
  let median;

  if (sorted.length % 2 === 1) {
    median = sorted[Math.floor(sorted.length / 2)];
  } else {
    const middle = sorted.length / 2;
    median = (sorted[middle - 1] + sorted[middle]) / 2;
  }

  let range = largest - smallest;
  
  return { sum, average, median, smallest, largest, range };
};


export const analyzeSequence = (numbers) => {
  const differences = [];
  for (let i = 1; i < numbers.length; i++) {
    differences.push(numbers[i] - numbers[i - 1]);
  }

  let ascending = true;
  let descending = true;
  let arithmetic = true;

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] <= numbers[i - 1]) ascending = false;
    if (numbers[i] >= numbers[i - 1]) descending = false;
    if (differences[i - 1] !== differences[0]) arithmetic = false;
  }

  let type = "No clear basic pattern detected.";
  if (numbers.length === 1) type = "Only one number was entered.";
  else if (ascending) type = "Strictly ascending sequence.";
  else if (descending) type = "Strictly descending sequence.";
  else if (arithmetic) type = "Arithmetic sequence.";

  return { type, differences };
};
