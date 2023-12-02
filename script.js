// generate the keys for the keyboard with numbers assigned, give each one a listener
// when a key is pressed, add the key to the current phrase
// and if the key creates a certain sequence, display it on the display

const keyboard = document.querySelector(".keyboard");
const screen = document.querySelector(".screen");
const keys = [7, 8, 9, "del", 4, 5, 6, "+", 1, 2, 3, "-", ".", "0", "/", "*", "reset", "="];

let currentPhrase = "";
let visiblePhrase = "";
let lastKey = "";

createKeyboard();

function createKeyboard() {
  for (let i = 0; i < keys.length; i++) {
    let button = document.createElement("div");
    
    button.classList.add("button");

    // = and * buttons need to have different views and/or class names, so we will
    // make those the exception
    if (keys[i] === "=") {
      button.classList.add("equal-button");
    } else {
      button.classList.add(keys[i] + "-button");
    }

    if (keys[i] === "*") {
      button.innerHTML = `<p>x</p>`;
    } else {
      button.innerHTML = `<p>${keys[i]}</p>`;
    }
    
    keyboard.appendChild(button);

    button.addEventListener("click", ()=>{
      updateKeyboard(keys[i]);
    })
  }
}

function updateKeyboard(currentKey) {
  if (currentKey == "=") {
    currentPhrase = eval(currentPhrase);
    visiblePhrase = currentPhrase;
    lastKey = currentPhrase;
  } else {
    if (currentKey === "reset") {
      currentPhrase = "";
      visiblePhrase = "";
    } else if (currentKey === "del") {
      currentPhrase = currentPhrase.slice(0, -1);
      lastKey = currentPhrase.charAt(currentPhrase.length - 1);
      console.log(lastKey);
      visiblePhrase = currentPhrase;
    } else if (isNaN(currentKey)) {
      currentPhrase = eval(currentPhrase);
      currentPhrase += currentKey;
      visiblePhrase = currentPhrase;
    } else { // number
      if (!isNaN(lastKey)) {
        // clears and starts with a new number
        currentPhrase = currentKey;
      } else {
        currentPhrase += currentKey;
      }
      visiblePhrase = currentPhrase;
    }
    lastKey = currentKey;
    }
  screen.innerHTML = `<p>${visiblePhrase}</p>`;
}