import { Game } from './Game.js';
import { Mapping } from './Map.js';
import { nullTile, floorTile, wallTile } from './Tile.js';

export default class Screens extends Game {
  run() {
    this.init();
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
        if (inputType.key === 'Enter') {
          Screen.switchScreen( Screen.playScreen() )
        }
      }
    }
  }

  playScreen() {
    const Screen = this;
    return {
      _map: null,
      _centerX: 0,
      _centerY: 0,
      enter() {
        let map = [];
        const mapWidth = 250;
        const mapHeight = 250;
        for (let x = 0; x < mapWidth; x++) {
          // create the nested array for the y values
          map.push( [] );
          // add all the tiles
          for (let y = 0; y < mapHeight; y++) {
            map[x].push( nullTile );
          }
        }
        const generator = new ROT.Map.Cellular( mapWidth, mapHeight );
        generator.randomize( 0.5 );

        const totalIterations = 3;
        // iteratively smoothen the map
        for (let i = 0; i < totalIterations; i++) {
          generator.create();
        }
        // cmoothen it one last time and then update our map
        generator.create( ( x, y, v ) => {
          if (v === 1) map[x][y] = floorTile;
          else map[x][y] = wallTile;
        } );
        // create our map from the tiles
        this._map = new Mapping( map );
      },
      move( dX, dY ) {
        this._centerX = Math.max( 0,
            Math.min( this._map.width - 1, this._centerX + dX ) );

        this._centerY = Math.max( 0,
            Math.min( this._map.height - 1, this._centerY + dY ) );
      },
      exit() { console.log( "Exited play screen." ); },
      render( display ) {
        const screenWidth = Screen.screenWidth;
        const screenHeight = Screen.screenHeight;
        // Make sure the x-axis doesn't go to the left of the left bound
        let topLeftX = Math.max( 0, this._centerX - ( screenWidth / 2 ) );
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min( topLeftX, this._map.width - screenWidth );
        // Make sure the y-axis doesn't above the top bound
        let topLeftY = Math.max( 0, this._centerY - ( screenHeight / 2 ) );
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.min( topLeftY, this._map.height - screenHeight );
        // Iterate through all visible map cells

        // iterate through all map cells
        for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
          for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
            // fetch the glyph for the tile and render it to the screen
            const glyph = this._map.getTile( x, y ).glyph;
            display.draw( x - topLeftX, y - topLeftY,
                glyph.char,
                glyph.foreground,
                glyph.background
            );
          }
          // Render the cursor
        }
        display.draw(
            this._centerX - topLeftX,
            this._centerY - topLeftY,
            '@',
            'white',
            'black' );

      },
      handleInput( event, inputType ) {
        if (inputType.code === 'Enter') {
          Screen.switchScreen( Screen.winScreen() );
        } else if (inputType.code === 'Space') {
          Screen.switchScreen( Screen.loseScreen() );
        } else if (inputType.code === 'Tab') {
          Screen.switchScreen( Screen.playScreen() );
        }

        // movements
        if (inputType.key === 'q') {
          this.move( -1, 0 );
        } else if (inputType.key === 'd') {
          this.move( 1, 0 );
        } else if (inputType.key === 'z') {
          this.move( 0, -1 );
        } else if (inputType.key === 's') {
          this.move( 0, 1 );
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
