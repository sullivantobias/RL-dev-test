import { Game } from "./Game.js";
import { Mapping } from "./Map.js";
import { NULLTILE, FLOORTILE, WALLTILE } from "./TileConstants.js";
import { PlayerTemplate } from "./Templates.js";
import { Entity } from "./Entity.js";
import { Mixins } from "./Entities.js";

export default class Screens extends Game {
  constructor(mixins) {
    super(mixins);
  }

  startScreen() {
    const Screen = this;
    return {
      enter() {
        console.log("Entered start screen.");
      },
      exit() {
        console.log("Exited start screen.");
      },
      render(display) {
        // Render our prompt to the screen
        display.drawText(1, 1, "Javascript Roguelike");
        display.drawText(1, 2, "Press [Enter] to start!");
      },
      handleInput(inputType) {
        if (inputType.key === "Enter") {
          Screen.switchScreen(Screen.playScreen());
        }
      }
    };
  }

  playScreen() {
    const Screen = this;
    return {
      _map: null,
      _player: null,
      enter() {
        let map = [];
        const mapWidth = 250;
        const mapHeight = 250;
        for (let x = 0; x < mapWidth; x++) {
          // create the nested array for the y values
          map.push([]);
          // add all the tiles
          for (let y = 0; y < mapHeight; y++) {
            map[x].push(NULLTILE);
          }
        }
        const generator = new ROT.Map.Cellular(mapWidth, mapHeight);
        generator.randomize(0.5);

        const totalIterations = 3;
        // iteratively smoothen the map
        for (let i = 0; i < totalIterations; i++) {
          generator.create();
        }
        // smoothen it one last time and then update our map
        generator.create((x, y, v) => {
          if (v === 1) map[x][y] = FLOORTILE;
          else map[x][y] = WALLTILE;
        });
        // create our map from the tiles
        this._player = new Entity(PlayerTemplate);
        this._map = new Mapping(map, this._player);

        this._map.engine.start();
      },
      move(dX, dY) {
        const newX = this._player.x + dX;
        const newY = this._player.y + dY;
        // try to move to the new cell
        this._player.tryMove(newX, newY, this._map);
      },
      exit() {
        console.log("Exited play screen.");
      },
      render(display) {
        const screenWidth = Screen.screenWidth;
        const screenHeight = Screen.screenHeight;
        // make sure the x-axis doesn't go to the left of the left bound
        let topLeftX = Math.max(0, this._player.x - screenWidth / 2);
        // make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, this._map.width - screenWidth);
        // make sure the y-axis doesn't above the top bound
        let topLeftY = Math.max(0, this._player.y - screenHeight / 2);
        // make sure we still have enough space to fit an entire game screen
        topLeftY = Math.min(topLeftY, this._map.height - screenHeight);
        // iterate through all visible map cells
        for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
          for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
            // Fetch the glyph for the tile and render it to the screen
            // at the offset position.
            var tile = this._map.getTile(x, y);
            display.draw(
              x - topLeftX,
              y - topLeftY,
              tile.char,
              tile.foreground,
              tile.background
            );
          }
        }
        const entities = this._map.entities;
        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i];
          // Only render the entitiy if they would show up on the screen
          if (
            entity.x >= topLeftX &&
            entity.y >= topLeftY &&
            entity.x < topLeftX + screenWidth &&
            entity.y < topLeftY + screenHeight
          ) {
            display.draw(
              entity.x - topLeftX,
              entity.y - topLeftY,
              entity.char,
              entity.foreground,
              entity.background
            );
          }
        }
        const messages = this._player.getMessages;
        const messageY = 0;
        for (let i = 0; i < messages.length; i++) {
          // Draw each message, adding the number of lines
          messageY += display.drawText(
            0,
            messageY,
            "%c{white}%b{black}" + messages[i]
          );
          let stats = "%c{white}%b{black}";
          stats += vsprintf("HP: %d/%d ", [
            this._player.hp,
            this._player.maxHp
          ]);
          display.drawText(0, screenHeight, stats);
        }
      },
      handleInput(inputType) {
        switch (inputType.code) {
          case "Enter":
            Screen.switchScreen(Screen.winScreen());
            break;
          case "Space":
            Screen.switchScreen(Screen.loseScreen());
            break;
          case "Tab":
            Screen.switchScreen(Screen.playScreen());
            break;
          default:
            break;
        }

        // movements
        switch (inputType.key) {
          case "q":
            this.move(-1, 0);
            break;
          case "d":
            this.move(1, 0);
            break;
          case "z":
            this.move(0, -1);
            break;
          case "s":
            this.move(0, 1);
            break;
          default:
            break;
        }

        // unlock the engine
        this._map.engine.unlock();
      }
    };
  }

  winScreen() {
    return {
      enter() {
        console.log("Entered win screen.");
      },
      exit() {
        console.log("Exited win screen.");
      },
      render(display) {
        display.drawText(2, 2, "Win");
      },
      handleInput() {}
    };
  }

  loseScreen() {
    return {
      enter() {
        console.log("Entered lose screen.");
      },
      exit() {
        console.log("Exited lose screen.");
      },
      render(display) {
        display.drawText(2, 2, "Lose");
      },
      handleInput() {}
    };
  }
}

export const RunGame = new Screens(Mixins);
