window.onload = function () {
  const min = 1;
  const max = 500;

  const data = [
    { label: "Mon", value: getRandomInt(min, max) },
    { label: "Tue", value: getRandomInt(min, max) },
    { label: "Wen", value: getRandomInt(min, max) },
    { label: "Thu", value: getRandomInt(min, max) },
    { label: "Fri", value: getRandomInt(min, max) },
    { label: "Sat", value: getRandomInt(min, max) },
    { label: "Sun", value: getRandomInt(min, max) }
  ];

  const targetId = "chart";
  const canvasWidth = 1200;
  const canvasHeight = 900;

  const chart = new BarChart(targetId, canvasWidth, canvasHeight, data);
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
