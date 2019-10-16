export class Game {
  constructor() {
    this._display = null;
    this._currentScreen = null;
    this._screenWidth = 80;
    this._screenHeight = 24;
  }

  init() {
    this._display = new ROT.Display({
      width: this._screenWidth,
      height: this._screenHeight
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
