import { RunGame } from "./Screen.js";

// create our Mixins namespace
export let Mixins = {};

// define our Moveable mixin
Mixins.Moveable = {
  name: "Moveable",
  init() {
    console.log("Mixin player");
  },
  tryMove(x, y, map) {
    const tile = map.getTile(x, y);
    const target = map.getEntityAt(x, y);
    // if an entity was present at the tile, then we
    // can't move there
    if (target) {
      return false;
    }
    // check if we can walk on the tile
    // and if so simply walk onto it
    else if (tile.isWalkable()) {
      // Update the entity's position
      this._x = x;
      this._y = y;
      return true;
      // check if the tile is diggable, and
      // if so try to dig it
    } else if (tile.isDiggable()) {
      map.dig(x, y);
      return true;
    }
    return false;
  }
};

Mixins.PlayerActor = {
  name: "PlayerActor",
  groupName: "Actor",
  act() {
    // re-render the screen
    RunGame.refresh();
    // lock the engine and wait asynchronously
    // for the player to press a key.
    this.map.engine.lock();
  }
};

Mixins.FungusActor = {
  name: "FungusActor",
  groupName: "Actor",
  act() {}
};
