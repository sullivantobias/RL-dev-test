class Glyph {
    constructor(chr, foreground, background) {
        this._char = chr || ' ';
        this._foreground = foreground || 'white';
        this._background = background || 'red';
    }

    get char () {
        return this._char;
    }
    get foreground () {
        return this._foreground;
    }
    get background () {
        return this._background;
    }
}

module.exports.Glyph = Glyph;