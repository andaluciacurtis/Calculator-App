// generate the keys for the keyboard with numbers assigned, give each one a listener
// when a key is pressed, add the key to the current phrase
// and if the key creates a certain sequence, display it on the display

const keyboard = document.querySelector(".keyboard");
const screen = document.querySelector(".screen");
const keys = [7, 8, 9, "del", 4, 5, 6, "+", 1, 2, 3, "-", ".", "0", "/", "*", "reset", "="];

let currentPhrase = "0";
let lastKey = "";
let isDecimal = false;

screen.innerHTML = `<p>${currentPhrase}</p>`
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
    currentPhrase = Math.round(eval(currentPhrase) * 100000) / 100000;
  } else if (currentKey === "reset") {
    currentPhrase = "0";
  } else if (currentKey === "del") {
    currentPhrase = currentPhrase.slice(0, -1);
    lastKey = currentPhrase.charAt(currentPhrase.length - 1);
    console.log(lastKey);
  } else if (currentKey === ".") {
    if (currentPhrase.includes(".") && isDecimal) {
      return;
    } else if (isNaN(currentPhrase.charAt(currentPhrase.length - 1))) {
      currentPhrase += "0.";
      isDecimal = true;
    } else if (lastKey === "=") {
      currentPhrase = "0.";
      isDecimal = true;
    } else {
      currentPhrase += ".";
      isDecimal = true;
    }
  } else if (isNaN(currentKey)) {
    // cannot add two operators in a row or an operator after a decimal point
    if (isNaN(lastKey) && lastKey != "=" && lastKey != "del" && lastKey != "reset") {
      return;
    }
    currentPhrase = Math.round(eval(currentPhrase) * 100000) / 100000;
    currentPhrase += currentKey;
    
    // ensures that two decimal points aren't put in the same number
    if (isNaN(currentPhrase.charAt(currentPhrase.length - 1)) || !currentPhrase.includes(".")) {
      isDecimal = false;
    }
  } else { // number
    if (lastKey === "=" || lastKey === "reset" || currentPhrase == "0") {
      // clears and starts with a new number
      currentPhrase = currentKey;
    } else {
      // ensures that numbers aren't added automatically
      currentPhrase += `${currentKey}`;
    }
  }  
  lastKey = currentKey;
  screen.innerHTML = `<p>${currentPhrase}</p>`;
}