import Screens from './Screen.js';

const Game = new Screens();

window.onload = function() {
  // Check if rot.js can work on this browser
  if (!ROT.isSupported()) {
    console.log("The rot.js library isn't supported by your browser.");
  } else {
    // initialize the game
    Game.init();
    // add the container to our HTML page
    document.body.appendChild(Game.display.getContainer());
    // load the start screen
    Game.switchScreen(Game.startScreen());
  }
}
