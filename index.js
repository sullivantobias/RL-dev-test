const ROT = require('rot-js');

const display = new ROT.Display({width: 80, height: 20, layout: 'term'});
display.getContainer();


for (let i = 0; i < 15; i++) {
    const foreground = ROT.Color.toRGB([255 - (i*20),
                                  255 - (i*20),
                                  255 - (i*20)]);

    const background = ROT.Color.toRGB([i*20, i*20, i*20]);
 
    const colors = "%c{" + foreground + "}%b{" + background + "}";

    display.drawText(0, i, colors + "Hello, world!");
}