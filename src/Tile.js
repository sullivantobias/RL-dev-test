const { Glyph } = require( './Glyph' );

class Tile {
    constructor(glyph) {
        this._glyph = glyph
    }

    get glyph() {
        return this._glyph;
    }
}

const nullTile = new Tile(new Glyph())
const floorTile = new Tile(new Glyph('.'));
const wallTile = new Tile(new Glyph('#', 'brown'));

module.exports.nullTile = nullTile;
module.exports.floorTile = floorTile;
module.exports.wallTile = wallTile;