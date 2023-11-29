// generate the keys for the keyboard with numbers assigned, give each one a listener
// when a key is pressed, add the key to the current phrase
// and if the key creates a certain sequence, display it on the display

const keyboard = document.querySelector(".keyboard");
const screen = document.querySelector(".screen");
const keys = [7, 8, 9, "del", 4, 5, 6, "+", 1, 2, 3, "-", ".", "0", "/", "x", "reset", "="];

let currentPhrase = "";

createKeyboard();

function createKeyboard() {
  for (let i = 0; i < keys.length; i++) {
    // Create new button for the current key
    let button = document.createElement("div");
    
    button.classList.add("button");
    button.classList.add(keys[i] + "-button");
    button.innerHTML = `<p>${keys[i]}</p>`;
    
    keyboard.appendChild(button);

    //Add listener
    button.addEventListener("click", ()=>{
      currentPhrase+=button.textContent;
      screen.textContent = currentPhrase;
    })
  }
}