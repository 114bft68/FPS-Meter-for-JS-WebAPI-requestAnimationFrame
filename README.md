# Notice:
This FPS Meter might be inaccurate.
Yes, I know of the existence of Stats.js, I just wanted to make something on my own.

# Initialize FPS Meter:
```js
import FPS from "https://114bft68.github.io/FPS-Meter-for-JS-WebAPI-requestAnimationFrame/fps.js";
let variable = new FPS(/* function to run inside requestAnimationFrame */);
```

# Start calculating FPS:
```js
variable.start(); // starts running requestAnimationFrame and calculating FPS
```

# Methods:
```js
variable.getCurrentFPS(); // returns the current FPS
```

```js
variable.getAverageFPS(); // returns the average FPS
```

```js
variable.generateGraph({
    width: , // (string) style.width of the graph including the unit, default = the default width of an HTML canvas
    height: , // (string) style.height of the graph including the unit, default = the default height of an HTML canvas
    bordersColor: , // (string) the color of the borders, default = black
    textsColor: , // (string) the color of the texts inside the graph, default = black
    linesColor: , // (string) the color of the lines inside the graph, default = blue
    fontSize:  // (number) the size of the texts in px, default = 11.5% of the graph height
}); // generates an FPS graph
```

```js
variable.removeGraph(); // removes the graph of 'variable'
```
