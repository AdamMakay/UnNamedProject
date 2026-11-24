import { getNumbersFromInput } from "./input.js";
import { getStatistics, analyzeSequence, getNextNumOfSequence } from "./Math Stuffs/analysis.js";
import { classifyNumbers, convertNumbers, transformNumbers } from "./Math Stuffs/math-tools.js";
import { showList, formatNumber } from "./Math Stuffs/utils.js";

// QUERRIES
const numberInput = document.getElementById("number-input");
const analyzeButton = document.getElementById("analyze-button");
const clearButton = document.getElementById("clear-button");
const inputMessage = document.getElementById("input-message");
const statisticsOutput = document.getElementById("statistics-output");
const sequenceOutput = document.getElementById("sequence-output");
const classificationOutput = document.getElementById("classification-output");
const conversionOutput = document.getElementById("conversion-output");
const transformationSelect = document.getElementById("transformation-select");
const transformButton = document.getElementById("transform-button");
const transformationOutput = document.getElementById("transformation-output");
const sequencePredictionOutput = document.querySelector("#sequence-prediction-output");

let currentNumbers = [];
let currentStats = {
  sum: 0,
  average: 0,
  median: 0,
  smallest: 0,
  largest: 0,
  range: 0,
  sequenceType: "",
  differences: []
};

const analyzeInput = function () {
  const numbers = getNumbersFromInput(numberInput.value);

  if (numbers === null) {
    inputMessage.textContent = "Please enter valid numbers. Separate them with commas, spaces or semicolons.";
    currentNumbers = [];
    return;
  }

  currentNumbers = numbers;
  inputMessage.textContent = "Input accepted.";

  currentStats = getStatistics(numbers);
  statisticsOutput.innerHTML = `
    <p>Sum: ${formatNumber(currentStats.sum)}</p>
    <p>Average: ${formatNumber(currentStats.average)}</p>
    <p>Median: ${formatNumber(currentStats.median)}</p>
    <p>Smallest: ${formatNumber(currentStats.smallest)}</p>
    <p>Largest: ${formatNumber(currentStats.largest)}</p>
    <p>Range: ${formatNumber(currentStats.range)}</p>
  `;

  const sequence = analyzeSequence(numbers);
  currentStats.sequenceType = sequence.type;
  currentStats.differences = sequence.differences;
  sequenceOutput.innerHTML = `<p>${sequence.type}</p><p>Differences: ${sequence.differences.join(", ") || "No differences could be calculated."}</p>`;

  const nextPossibleNumOfSequence = getNextNumOfSequence(currentNumbers, currentStats);
  sequencePredictionOutput.innerHTML = `<p>Next possible num of sequence: ${nextPossibleNumOfSequence === -1 ? "cannot be determined based on only one number!" : nextPossibleNumOfSequence}</p>`;

  classificationOutput.innerHTML = showList(classifyNumbers(numbers));
  conversionOutput.innerHTML = showList(convertNumbers(numbers));
  transformationOutput.textContent = "Choose a transformation and press the button.";
};

analyzeButton.addEventListener("click", analyzeInput);

transformButton.addEventListener("click", () => {
  if (currentNumbers.length === 0) {
    transformationOutput.textContent = "Analyze a sequence first.";
    return;
  }

  const choice = transformationSelect.value;
  const result = transformNumbers(currentNumbers, choice);
  transformationOutput.textContent = result.join(", ");
});

clearButton.addEventListener("click", () => {
  numberInput.value = "";
  inputMessage.textContent = "";
  currentNumbers = [];
  statisticsOutput.textContent = "Enter numbers to see statistics.";
  sequenceOutput.textContent = "Your sequence will be analyzed here.";
  classificationOutput.textContent = "Number classifications will appear here.";
  conversionOutput.textContent = "Conversions will appear here.";
  transformationOutput.textContent = "";
});
