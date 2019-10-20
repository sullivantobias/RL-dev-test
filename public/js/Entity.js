import { Glyph } from "./Glyph.js";

export class Entity extends Glyph {
  constructor(props) {
    props = props || {};
    super(props);
    // instantiate any properties from the passed object
    this._name = props["name"] || "";
    this._x = props["x"] || 0;
    this._y = props["y"] || 0;
    this._map = null;

    // create an object which will keep track what mixins we have
    // attached to this entity based on the name property
    this._attachedMixins = {};

    // create a similar object for groups
    this._attachedMixinGroups = {};

    const mixins = props["mixins"] || [];
    for (let i = 0; i < mixins.length; i++) {
      // copy over all properties from each mixin as long
      // as it's not the name or the init property. We
      // also make sure not to override a property that
      // already exists on the entity.
      for (let key in mixins[i]) {
        if (key != "init" && key != "name" && !this.hasOwnProperty(key)) {
          this[key] = mixins[i][key];
        }
      }
      // add the name of this mixin to our attached mixins
      this._attachedMixins[mixins[i].name] = true;
      // if a group name is present, add it
      if (mixins[i].groupName) {
        this._attachedMixinGroups[mixins[i].groupName] = true;
      }
      // finally call the init function if there is one
      if (mixins[i].init) mixins[i].init(this);
    }
  }

  hasMixin(obj) {
    // allow passing the mixin itself or the name as a string
    if (typeof obj === "object") {
      return this._attachedMixins[obj.name];
    } else {
      return this._attachedMixins[obj] || this._attachedMixinGroups[obj];
    }
  }

  set name(name) {
    this._name = name;
  }

  set x(x) {
    this._x = x;
  }

  set y(y) {
    this._y = y;
  }

  set map(map) {
    this._map = map;
  }

  get name() {
    return this._name;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get map() {
    return this._map;
  }
}
