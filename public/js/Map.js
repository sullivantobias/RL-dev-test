import { nullTile } from './Tile.js';

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

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    // gets the tile for a given coordinate set
    getTile(x, y) {
        /**
         * Make sure we are inside the bounds. If we aren't, return
         * null tile.
         */
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return nullTile;
        } else {
            return this._tiles[x][y] || nullTile;
        }
    }
}