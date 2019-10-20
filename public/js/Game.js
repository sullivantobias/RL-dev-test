export class Game {
  constructor(mixins) {
    this._display = null;
    this._currentScreen = null;
    this._screenWidth = 80;
    this._screenHeight = 24;

    this._mixins = mixins;
  }

  init() {
    this._display = new ROT.Display({
      width: this._screenWidth,
      height: this._screenHeight + 1
    });

    const bindEventToScreen = event => {
      window.addEventListener(event, e => {
        if (this._currentScreen !== null) {
          // Send the event type and data to the screen
          this._currentScreen.handleInput(e);
        }
      });
    };

    bindEventToScreen("keydown");
  }

  refresh() {
    // clear the screen
    this.display.clear();
    // render the screen
    this._currentScreen.render(this._display);
  }

  switchScreen(screen) {
    if (this._currentScreen) this._currentScreen.exit();
    // Clear the display
    this.display.clear();

    // update our current screen, notify it we entered
    // and then render it
    this._currentScreen = screen;

    if (this._currentScreen) {
      this._currentScreen.enter();
      this.refresh();
    }
  }

  sendMessage(recipient, message, args) {
    // Make sure the recipient can receive the message
    // before doing any work.
    if (recipient.hasMixin(this._mixins.MessageRecipient)) {
      // If args were passed, then we format the message, else
      // no formatting is necessary
      if (args) {
        message = vsprintf(message, args);
      }
      recipient.receiveMessage(message);
    }
  }

  sendMessageNearby(map, centerX, centerY, message, args) {
    // If args were passed, then we format the message, else
    // no formatting is necessary
    if (args) {
      message = vsprintf(message, args);
    }
    // Get the nearby entities
    const entities = map.getEntitiesWithinRadius(centerX, centerY, 5);
    // Iterate through nearby entities, sending the message if
    // they can receive it.
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].hasMixin(this._mixins.MessageRecipient)) {
        entities[i].receiveMessage(message);
      }
    }
  }

  get display() {
    return this._display;
  }

  get screenWidth() {
    return this._screenWidth;
  }

  get screenHeight() {
    return this._screenHeight;
  }
}
