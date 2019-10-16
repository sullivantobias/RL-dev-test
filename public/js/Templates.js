import { Mixins } from "./Entities.js";

// player template
export const PlayerTemplate = {
  character: "@",
  foreground: "white",
  background: "black",
  mixins: [Mixins.Moveable, Mixins.PlayerActor]
};

// object template
export const ObjectTemplate = {
  character: ")",
  foreground: "blue",
  background: "black"
};

export const FungusTemplate = {
  character: "F",
  foreground: "green",
  mixins: [Mixins.FungusActor]
};
