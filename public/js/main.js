import { RunGame } from "./Screen.js";

window.onload = function() {
  // initialize the game
  RunGame.init();
  // add the container to our HTML page
  document.body.appendChild(RunGame.display.getContainer());
  // load the start screen
  RunGame.switchScreen(RunGame.startScreen());
};
