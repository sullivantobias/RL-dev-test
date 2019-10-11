const { Game } = require( './Game' );
const { Map } = require( './Map' );
const { nullTile, floorTile, wallTile } = require( './Tile' );
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
      _map : null,
      enter() { 
        let map = [];
        for (let x = 0; x < 80; x++) {
            // create the nested array for the y values
            map.push([]);
            // add all the tiles
            for (let y = 0; y < 20; y++) {
                map[x].push(nullTile);
            }
        } 
        const generator = new ROT.Map.Cellular(80, 20);
        generator.randomize(0.5);

        const totalIterations = 3;
        // iteratively smoothen the map
        for (let i = 0; i < totalIterations; i++) {
            generator.create();
        }
        // cmoothen it one last time and then update our map
        generator.create((x, y, v) => {
            if (v === 1) map[x][y] = floorTile; 
            else map[x][y] = wallTile;
        });
        // create our map from the tiles
        this._map = new Map(map);
      },
      exit() { console.log( "Exited play screen." ); },
      render( display ) {
        // iterate through all map cells
        for (let x = 0; x < this._map.width; x++) {
          for (let y = 0; y < this._map.height; y++) {
              // fetch the glyph for the tile and render it to the screen
              const glyph = this._map.getTile(x, y).glyph;
              display.draw(x, y,
                  glyph.char,
                  glyph.foreground, 
                  glyph.background);
          }
  }
      },
      handleInput( event, inputType ) {
        if (inputType.charCodeAt( 0 ) === ROT.KEYS.VK_RETURN) {
          Screen.switchScreen( Screen.winScreen() );
        } else if (inputType.charCodeAt( 0 ) === ROT.KEYS.VK_SPACE) {
          Screen.switchScreen( Screen.loseScreen() );
        } else if (inputType.charCodeAt( 0 ) === ROT.KEYS.VK_TAB) {
          Screen.switchScreen( Screen.playScreen() );
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
