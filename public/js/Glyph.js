export class Glyph {
  constructor(props) {
    props = props || {};
    this._char = props["character"] || " ";
    this._foreground = props["foreground"] || "white";
    this._background = props["background"] || "black";
  }

  get char() {
    return this._char;
  }
  get foreground() {
    return this._foreground;
  }
  get background() {
    return this._background;
  }
}
