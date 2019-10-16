import { NULLTILE, FLOORTILE } from "./TileConstants.js";
import { Entity } from "./Entity.js";
import { FungusTemplate } from "./Templates.js";

export class Mapping {
  constructor(tiles, player) {
    this._tiles = tiles;
    /**
     * cache the width and height based
     * on the length of the dimensions of
     * the tiles array
     */

    this._width = tiles.length;
    this._height = tiles[0].length;

    // create a list which will hold the entities
    this._entities = [];
    // create the engine and scheduler
    this._scheduler = new ROT.Scheduler.Simple();
    this._engine = new ROT.Engine(this._scheduler);

    // add the player
    this.addEntityAtRandomPosition(player);
    // add random fungi
    for (let i = 0; i < 1000; i++) {
      this.addEntityAtRandomPosition(new Entity(FungusTemplate));
    }
  }

  dig(x, y) {
    // if the tile is diggable, update it to a floor
    if (this.getTile(x, y).isDiggable()) {
      this._tiles[x][y] = FLOORTILE;
    }
  }

  getRandomFloorPosition() {
    // randomly generate a tile which is a floor
    let x, y;
    do {
      x = Math.floor(Math.random() * this._width);
      y = Math.floor(Math.random() * this._width);
    } while (this.getTile(x, y) != FLOORTILE || this.getEntityAt(x, y));

    return { x: x, y: y };
  }

  addEntity(entity) {
    // make sure the entity's position is within bounds
    if (
      entity.x < 0 ||
      entity.x >= this._width ||
      entity.y < 0 ||
      entity.y >= this._height
    ) {
      throw new Error("Adding entity out of bounds.");
    }
    // update the entity's map
    entity.map = this;
    // add the entity to the list of entities
    this._entities.push(entity);
    // check if this entity is an actor, and if so add
    // them to the scheduler
    if (entity.hasMixin("Actor")) {
      this._scheduler.add(entity, true);
    }
  }

  addEntityAtRandomPosition(entity) {
    const position = this.getRandomFloorPosition();
    entity.x = position.x;
    entity.y = position.y;
    this.addEntity(entity);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get engine() {
    return this._engine;
  }

  get entities() {
    return this._entities;
  }

  getEntityAt(x, y) {
    // iterate through all entities searching for one with
    // matching position
    for (var i = 0; i < this._entities.length; i++) {
      if (this._entities[i].x == x && this._entities[i].y == y) {
        return this._entities[i];
      }
    }
    return false;
  }
  // gets the tile for a given coordinate set
  getTile(x, y) {
    /**
     * make sure we are inside the bounds. If we aren't, return
     * null tile.
     */
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      return NULLTILE;
    } else {
      return this._tiles[x][y] || NULLTILE;
    }
  }
}
