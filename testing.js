import fps from "./fps.js";

let i = 0;
let f = new fps(() => {
    document.getElementById('text').innerHTML = i++;
});

f.start();

let tb = document.getElementById('tb');
let p = Array.from(document.getElementsByTagName('p'));

function handle(first, second, third, fourth) {
    if (first) {
        tb.value = f.getCurrentFPS();
    } else if (second) {
        tb.value = f.getAverageFPS();
    } else if (third) {
        f.generateGraph({
            linesColor: 'red',
            bordersColor: 'blue',
            textsColor: 'black'
        });
    } else if (fourth) {
        f.removeGraph();
    }
}

document.addEventListener('keydown', (e) => {
    handle(/^[aA]$/.test(e.key), /^[bB]$/.test(e.key), /^[cC]$/.test(e.key), /^[dD]$/.test(e.key))
});

p.forEach((element) => {
    element.addEventListener('click', (e) => {
        handle(e.target === p[0], e.target === p[1], e.target === p[2], e.target === p[3]);
    });
});
