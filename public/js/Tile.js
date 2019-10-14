import { Glyph } from './Glyph.js';

class Tile {
    constructor(glyph) {
        this._glyph = glyph
    }

    get glyph() {
        return this._glyph;
    }
}

export const nullTile = new Tile(new Glyph())
export const floorTile = new Tile(new Glyph('.'));
export const wallTile = new Tile(new Glyph('#', 'brown'));