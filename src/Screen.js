const { Game } = require( './Game' );
const ROT = require( 'rot-js' );

class Screens extends Game {
  run() {
    this.init();
    this.switchScreen( this.startScreen() )
  }

  startScreen() {
    const Screen = this;
    return {
      enter() { console.log( "Entered start screen." ); },
      exit() { console.log( "Exited start screen." ); },
      render( display ) {
        // Render our prompt to the screen
        display.drawText( 1, 1, "Javascript Roguelike" );
        display.drawText( 1, 2, "Press [Enter] to start!" );
      },
      handleInput( event, inputType ) {
        if (ROT.KEYS.VK_RETURN === inputType.charCodeAt( 0 )) {
          Screen.switchScreen( Screen.playScreen() )
        }
      }
    }
  }

  playScreen() {
    const Screen = this;
    return {
      enter() { console.log( "Entered play screen." ); },
      exit() { console.log( "Exited play screen." ); },
      render( display ) {
        display.drawText( 3, 5, "%c{red}%b{white}This game is so much fun!" );
        display.drawText( 4, 6, "Press [Enter] to win, or [Space] to lose!" );
      },
      handleInput( event, inputType ) {
        if (inputType.charCodeAt( 0 ) === ROT.KEYS.VK_RETURN) {
          Screen.switchScreen( Screen.winScreen() );
        } else if (inputType.charCodeAt( 0 ) === ROT.KEYS.VK_SPACE) {
          Screen.switchScreen( Screen.loseScreen() );
        }
      }
    }
  }

  winScreen() {
    return {
      enter() { console.log( "Entered win screen." ); },
      exit() { console.log( "Exited win screen." ); },
      render( display ) {
        display.drawText( 2, 2, "Win" );
      },
      handleInput() {

      }
    }
  }

  loseScreen() {
    return {
      enter() { console.log( "Entered lose screen." ); },
      exit() { console.log( "Exited lose screen." ); },
      render( display ) {
        display.drawText( 2, 2, "Lose" );
      },
      handleInput() {

      }
    }
  }
}

module.exports.Screens = Screens;
