let cells = [];
let size = 5;
let generation = 0;
let rule = 0;

function setup() {
  createCanvas(910, 910);

  w = width / size;

  let ruleInputLabel = createP("Enter a rule number: ");
  let ruleInput = createInput(18, "number");

  ruleInputLabel.parent("ruleInputContainer");
  ruleInput.parent("ruleInputContainer");

  rule = parseInt(ruleInput.value());

  ruleInput.input(() => {
    startNew();
    loop();
    rule = parseInt(ruleInput.value());
  });

  startNew();
}

function draw() {
  noStroke();
  for (let i = 0; i < cells.length; i++) {
    fill(255 - 255 * cells[i]);
    rect(i * size, generation * size, size, size);
  }

  cells = calcNextGen(cells);

  if (generation * size > height) {
    noLoop();
  }
}

function startNew() {
  background(255);
  for (let i = 0; i < w; i++) {
    cells[i] = 0;
  }

  let middle = Math.floor(cells.length / 2);
  cells[middle] = 1;

  generation = 0;
}

function calcNextGen(cells) {
  let nextGeneration = [];

  for (let i = 0; i < cells.length; i++) {
    let left = cells[(i - 1 + cells.length) % cells.length];
    let middle = cells[i % cells.length];
    let right = cells[(i + 1) % cells.length];

    nextGeneration[i] = rules(left, middle, right);
  }

  generation++;

  return nextGeneration;
}

function rules(a, b, c) {
  //convert base10 int rule to array of binaray digits
  let ruleset = rule
    .toString(2)
    .padStart(8, "0")
    .split("")
    .map((digit) => parseInt(digit));

  let state = "" + a + b + c;

  state = 7 - parseInt(state, 2);

  return ruleset[state];

  if (a === 1 && b === 1 && c === 1) return ruleset[0];
  else if (a === 1 && b === 1 && c === 0) return ruleset[1];
  else if (a === 1 && b === 0 && c === 1) return ruleset[2];
  else if (a === 1 && b === 0 && c === 0) return ruleset[3];
  else if (a === 0 && b === 1 && c === 1) return ruleset[4];
  else if (a === 0 && b === 1 && c === 0) return ruleset[5];
  else if (a === 0 && b === 0 && c === 1) return ruleset[6];
  else if (a === 0 && b === 0 && c === 0) return ruleset[7];
}
