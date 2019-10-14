import Screens from './Screen.js';


const run = new Screens();

window.onload = function() {
  // Check if rot.js can work on this browser
  if (!ROT.isSupported()) {
    alert("The rot.js library isn't supported by your browser.");
  } else {

    // Initialize the game
    run.run();
    // Add the container to our HTML page
    document.body.appendChild(run.display.getContainer());
    // Load the start screen
    run.switchScreen(run.startScreen());
  }
}


