import { nullTile, floorTile } from './Tile.js';

export class Mapping {
    constructor(tiles) {
        this._tiles = tiles;
        /**
         * cache the width and height based
         * on the length of the dimensions of
         * the tiles array
         */ 
        this._width = tiles.length;
        this._height = tiles[0].length;
    }

    dig(x, y) {
        // if the tile is diggable, update it to a floor
        if (this.getTile(x, y).isDiggable()) {
            this._tiles[x][y] = floorTile;
        }
    }

    getRandomFloorPosition() {
        // randomly generate a tile which is a floor
        let x, y;
        do {
            x = Math.floor(Math.random() * this._width);
            y = Math.floor(Math.random() * this._width);
        } while(this.getTile(x, y) != floorTile);

        return { x: x, y: y };
    }

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    // gets the tile for a given coordinate set
    getTile(x, y) {
        /**
         * make sure we are inside the bounds. If we aren't, return
         * null tile.
         */
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return nullTile;
        } else {
            return this._tiles[x][y] || nullTile;
        }
    }
}