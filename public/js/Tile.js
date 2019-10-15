import { Glyph } from './Glyph.js';

class Tile extends Glyph {
    constructor(props) {
        props = props || {}
        super(props);
        // set up the properties. we use false by default.
        this._isWalkable = props['isWalkable'] || false;
        this._isDiggable = props['isDiggable'] || false;
    }
    isWalkable() {
        return this._isWalkable;
    }

    isDiggable() {
        return this._isDiggable;
    }

}

export const nullTile = new Tile({})
export const floorTile = new Tile({
    character: '.',
    isWalkable: true
});
export const wallTile = new Tile({
    character: '#',
    foreground: 'goldenrod',
    isDiggable: true
});