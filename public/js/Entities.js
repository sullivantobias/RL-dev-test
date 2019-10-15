// create our Mixins namespace
let Mixins = {};

// define our Moveable mixin
Mixins.Moveable = {
    name: 'Moveable',
    init() {
        console.log('Mixin player')
    },
    tryMove(x, y, map) {
        const tile = map.getTile(x, y);
        // check if we can walk on the tile
        // and if so simply walk onto it
        if (tile.isWalkable()) {
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
}

// player template
export const PlayerTemplate = {
    character: '@',
    foreground: 'white',
    background: 'black',
    mixins: [Mixins.Moveable]
}