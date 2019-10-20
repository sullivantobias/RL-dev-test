import { Mixins } from "./Entities.js";

export const PlayerTemplate = {
  character: "@",
  foreground: "white",
  maxHp: 40,
  attackValue: 10,
  mixins: [
    Mixins.Moveable,
    Mixins.PlayerActor,
    Mixins.Attacker,
    Mixins.Destructible,
    Mixins.MessageRecipient
  ]
};
// Fungus template
export const FungusTemplate = {
  character: "F",
  foreground: "green",
  maxHp: 40,
  mixins: [Mixins.FungusActor, Mixins.Destructible]
};
