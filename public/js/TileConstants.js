import { Tile } from "./Tile.js";

export const NULLTILE = new Tile({});
export const FLOORTILE = new Tile({
  character: ".",
  isWalkable: true
});
export const WALLTILE = new Tile({
  character: "#",
  foreground: "goldenrod",
  isDiggable: true
});
