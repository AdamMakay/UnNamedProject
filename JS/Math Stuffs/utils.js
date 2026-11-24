export const showList = (items) => {
  let html = "<ul>";
  for (const item of items) html += `<li>${item}</li>`;
  html += "</ul>";
  return html;
};


export const formatNumber = (number) => Number(number.toFixed(3));
