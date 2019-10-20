import { RunGame } from "./Screen.js";
import { Entity } from "./Entity.js";
import { FungusTemplate } from "./Templates.js";

// create our Mixins namespace
export let Mixins = {};

Mixins.Moveable = {
  name: "Moveable",
  init() {},
  tryMove(x, y, map) {
    const tile = map.getTile(x, y);
    const target = map.getEntityAt(x, y);
    // if an entity was present at the tile, then we
    // can't move there
    if (target) {
      // if we are an attacker, try to attack
      // the target
      if (this.hasMixin("Attacker")) {
        this.attack(target);
        return true;
      } else return false;
    }
    // check if we can walk on the tile
    // and if so simply walk onto it
    else if (tile.isWalkable()) {
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
};

Mixins.PlayerActor = {
  name: "PlayerActor",
  groupName: "Actor",
  act() {
    // re-render the screen
    RunGame.refresh();
    // lock the engine and wait asynchronously
    // for the player to press a key.
    this.map.engine.lock();

    this.clearMessages();
  }
};

Mixins.FungusActor = {
  name: "FungusActor",
  groupName: "Actor",
  init() {
    this._growthsRemaining = 5;
  },
  act() {
    // check if we are going to try growing this turn
    if (this._growthsRemaining > 0) {
      if (Math.random() <= 0.02) {
        // generate the coordinates of a random adjacent square by
        // generating an offset between [-1, 0, 1] for both the x and
        // y directions. To do this, we generate a number from 0-2 and then
        // subtract 1.
        const xOffset = Math.floor(Math.random() * 3) - 1;
        const yOffset = Math.floor(Math.random() * 3) - 1;
        // make sure we aren't trying to spawn on the same tile as us
        if (xOffset != 0 || yOffset != 0) {
          // check if we can actually spawn at that location, and if so
          // then we grow!
          if (this.map.isEmptyFloor(this.x + xOffset, this.y + yOffset)) {
            const entity = new Entity(FungusTemplate);
            entity.x = this.x + xOffset;
            entity.y = this.y + yOffset;
            this.map.addEntity(entity);
            this._growthsRemaining--;

            // send a message nearby!
            RunGame.sendMessageNearby(
              this.map,
              entity.x,
              entity.y,
              "The fungus is spreading!"
            );
          }
        }
      }
    }
  }
};

Mixins.Attacker = {
  name: "Attacker",
  groupName: "Attacker",
  init(template) {
    this._attackValue = template["attackValue"] || 1;
  },
  getAttackValue() {
    return this._attackValue;
  },
  attack(target) {
    // only remove the entity if they were attackable
    if (target.hasMixin("Destructible")) {
      const attack = 2; // this.getAttackValue();
      const defense = target.getDefenseValue();
      const max = Math.max(0, attack - defense);
      const damage = 1 + Math.floor(Math.random() * max);

      RunGame.sendMessage(this, "You strike the %s for %d damage!", [
        target.name,
        damage
      ]);
      RunGame.sendMessage(target, "The %s strikes you for %d damage!", [
        this.name,
        damage
      ]);
      target.takeDamage(this, damage);
    }
  }
};

Mixins.Destructible = {
  groupName: "Destructible",
  init(template) {
    this._maxHp = template["maxHp"] || 10;
    // We allow taking in health from the template incase we want
    // the entity to start with a different amount of HP than the
    // max specified.
    this._hp = template["hp"] || this._maxHp;
    this._defenseValue = template["defenseValue"] || 0;
  },
  takeDamage(attacker, damage) {
    this._hp -= damage;
    // If have 0 or less HP, then remove ourseles from the map
    if (this._hp <= 0) {
      RunGame.sendMessage(attacker, "You kill the %s!", [this.map]);
      RunGame.sendMessage(this, "You die!");
      this.map.removeEntity(this);
    }
  },
  getHp() {
    return this._hp;
  },
  getMaxHp() {
    return this._maxHp;
  },
  getDefenseValue() {
    return this._defenseValue;
  }
};

Mixins.MessageRecipient = {
  name: "MessageRecipient",
  init(template) {
    this._messages = [];
  },
  receiveMessage(message) {
    this._messages.push(message);
  },
  getMessages() {
    return this._messages;
  },
  clearMessages() {
    this._messages = [];
  }
};
