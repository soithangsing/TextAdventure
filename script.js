"use strict";

const textElement = document.getElementById("text");
const optionsButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = { default: true };
  showTextNodes(1);
}

function mainMenu() {
  location.reload();
}

function moreInfo() {
  showTextNodes(99);
}

function showTextNodes(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionsButtonsElement.firstChild) {
    optionsButtonsElement.removeChild(optionsButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionsButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return mainMenu();
  }
  state = Object.assign(state, option.setState);
  showTextNodes(nextTextNodeId);
}

const textNodes = [
  {
    id: 0,
    text: "Welcome to Gone Astray!",
    options: [
      {
        text: "Start game",
        setState: { default: true },
        nextText: 1,
      },
      {
        text: "More info",
        nextText: 99,
      },
    ],
  },
  {
    id: 1,
    text: "You are running away from a shadow",
    options: [
      {
        text: "Run Faster",
        requiredState: (currentState) => currentState.default,
        setState: { default: false, run: true },
        nextText: 2,
      },
      {
        text: "Stand your ground",
        requiredState: (currentState) => currentState.default,
        setState: { default: false, stand: true },
        nextText: 2,
      },
      {
        text: "Look for help",
        requiredState: (currentState) => currentState.default,
        setState: { default: false, seek: true },
        nextText: 2,
      },
      {
        text: "Jump over the cliff",
        requiredState: (currentState) => currentState.default,
        setState: { default: false, jump: true },
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "The shadow is still chasing you!",
    options: [
      {
        text: "Fight the shadow",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "You win and the shadow fizzles to nothing!",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 99,
    text: "Gone Astray is a game made by Soipu",
    options: [
      {
        text: "Return To Main Menu",
        nextText: -1,
      },
    ],
  },
];

// Call start game on main menu button
// startGame();

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);
const moreInfoBtn = document.getElementById("more-info-button");
moreInfoBtn.addEventListener("click", moreInfo);
