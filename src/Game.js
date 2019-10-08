const ROT = require('rot-js');
const readline = require('readline');
const { startScreen } = require('./Screen')

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

class Game {
    constructor() {
        this._display = null;
        this._currentScreen = null;
    }

    static screens = {
        startScreen
    }

    static init() {
        this._display = new ROT.Display({width: 80, height: 20, layout: 'term'});
       
        const bindEventToScreen = event => {
            process.stdin.on(event, (str, key) => {
                if (this._currentScreen !== null) {
                    // Send the event type and data to the screen
                    this._currentScreen.handleInput(event, str);
                }
            })
         }

        bindEventToScreen('keydown');
        bindEventToScreen('keyup');
        bindEventToScreen('keypress');
    }

    static switchScreen(screen) {
        // check if there is a screen, if yes, exit()
        if (this._currentScreen) this._currentScreen.exit();
        
        // Clear the display
        this.display.clear();
        
        // update our current screen, notify it we entered
        // and then render it
        this._currentScreen = screen;

        if (this._currentScreen) {
            this._currentScreen.enter();
            this._currentScreen.render(this._display);
        }
    }
    
    static get display() {
        return this._display;
    }
}

module.exports.Game = Game;