export default class FPS {
    constructor(action) {
        this.fps = 0;
        this.last = 0;
        this.fpsArray = [];
        this.action = action;
        this.graph = () => {}
        this.graphCanvas = '';
    }

    start() {
        const f = (now) => {
            let deltaTime = now - this.last;
            this.fps = 1000 / deltaTime;
            this.fpsArray.push(this.fps);
            this.action();
            this.graph();
            this.last = now;
            requestAnimationFrame(f);
        }
        requestAnimationFrame((time) => f(time));
    }

    getCurrentFPS() {
        return this.fps;
    }

    getAverageFPS() {
        let sum = 0;
        let array = this.fpsArray;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum / array.length;
    }

    generateGraph(object) {
        if (!this.graphCanvas) {
            const WIDTH = object.width || 'auto';
            const HEIGHT = object.height || 'auto';
            const BORDERS_COLOR = object.bordersColor || 'black';
            const TEXTS_COLOR = object.textsColor || 'black';
            const LINES_COLOR = object.linesColor || 'blue';

            const c = document.createElement('canvas');
            c.setAttribute('style', `width: ${WIDTH}; height: ${HEIGHT}; padding: 0; margin: 0;`);
            c.className = 'fps-graph';
            document.body.appendChild(c);
            c.width = c.clientWidth;
            c.height = c.clientHeight;
            this.graphCanvas = c;
            const ctx = c.getContext('2d');
            const FONT_SIZE = object.fontSize || c.height * 0.115;

            this.graph = () => {
                // borders
                ctx.strokeStyle = BORDERS_COLOR;
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.beginPath();
                ctx.rect(0, 0, c.width, c.height);
                ctx.stroke();

                // lines
                let x = 0;
                let fpsArrayCopy = this.fpsArray;
                let maxLength = c.width;
                let fps_height_ratio = c.height / (this.getAverageFPS() * 2);
                let sum = 0;

                while (fpsArrayCopy.length > maxLength) {
                    fpsArrayCopy.shift();
                }

                for (let item of fpsArrayCopy) {
                    sum += item;
                }

                for (let i = 0; i < fpsArrayCopy.length; i++) {
                    ctx.strokeStyle = LINES_COLOR;
                    ctx.beginPath();
                    ctx.moveTo(x, c.height - fps_height_ratio * fpsArrayCopy[i]);
                    ctx.lineTo(++x, c.height - fps_height_ratio * fpsArrayCopy[i + 1]);
                    ctx.stroke();
                }

                // texts
                ctx.textBaseline = 'middle';
                ctx.fillStyle = TEXTS_COLOR;
                ctx.font = `bold ${FONT_SIZE}px Arial`;

                ctx.fillText(Math.round((sum / fpsArrayCopy.length) * 2), 2, FONT_SIZE / 2 + fps_height_ratio);
                ctx.fillText(Math.round(sum / fpsArrayCopy.length), 2, c.height / 2);
                ctx.fillText(0, 2, c.height - FONT_SIZE / 2 - fps_height_ratio);
            }
        }
    }

    removeGraph() {
        this.graphCanvas ? this.graphCanvas.remove() : void 0;
        this.graphCanvas = '';
    }
}