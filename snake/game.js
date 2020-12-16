const background = document.createElement('div');
document.body.appendChild(background);
background.classList.add('background');

const map = document.createElement('div');
background.appendChild(map);
map.classList.add('map');

for (let i = 1; i < 290; i++) {
    const box = document.createElement('div');
    map.appendChild(box);
    box.classList.add('box');
}

const box = document.getElementsByClassName('box');
let x = 1;
let y = 17;

for (i = 0; i < box.length; i++) {
    if (x > 17) {
        x = 1;
        y--;
    }
    box[i].setAttribute('positionX', x);
    box[i].setAttribute('positionY', y);
    x++;
}

function snakeEngine() {
    const positionX = (Math.random() * (17 - 3) + 3) << 0;
    const positionY = (Math.random() * (17 - 1) + 1) << 0;
    return [positionX, positionY];    
}

const getSelectors = (posX, posY) => 
    `[positionX = "${posX}"][positionY = "${posY}"]`;

const unshiftSnakeTail = (snakeTail, posX, posY) => {
    const selectors = getSelectors(posX, posY);
    const element = document.querySelector(selectors);
    snakeTail.unshift(element);
}

const [snakeX, snakeY] = snakeEngine();
let snakeTail = [
    document.querySelector(getSelectors(snakeX, snakeY)),
    document.querySelector(getSelectors(snakeX - 1, snakeY)),
    document.querySelector(getSelectors(snakeX - 2, snakeY))
];

for (let i = 1; i < snakeTail.length; i++) {
    snakeTail[i].classList.add('snakeTail');
}

snakeTail[0].classList.add('snakeHead');

let food;

function createFood() {
    function foodEngine() {
        const positionX = Math.round(Math.random() * (17 - 3) + 3);
        const positionY = Math.round(Math.random() * (17 - 1) + 1);
        return [positionX, positionY];
    }
    
    let foodCoordinates = foodEngine();
    food = document.querySelector(
        getSelectors(foodCoordinates[0], foodCoordinates[1])
    );

    while(food.classList.contains('snakeTail')) {
        let foodCoordinates = foodEngine();
        food = document.querySelector(
            getSelectors(foodCoordinates[0], foodCoordinates[1])
        );
    }

    food.classList.add('food');
}

createFood();

let direction = 'right';
let steps = false;

let input = document.createElement('input');
background.appendChild(input);
input.classList.add('input');

let score = 0;
input.value = `Score: ${score}`;

function move() {
    let snakeCoordinates = [snakeTail[0].getAttribute('positionX'), snakeTail[0].getAttribute('positionY')];
    snakeTail[0].classList.remove('snakeHead');
    snakeTail[snakeTail.length-1].classList.remove('snakeTail');
    snakeTail.pop();

    switch(direction) {
        case 'right':
            if (snakeCoordinates[0] < 17) {
                unshiftSnakeTail(snakeTail, +snakeCoordinates[0] + 1, snakeCoordinates[1]);
            } else {
                unshiftSnakeTail(snakeTail, 1, snakeCoordinates[1]);
            }
            break;
        case 'left':
            if (snakeCoordinates[0] > 1) {
                unshiftSnakeTail(snakeTail, +snakeCoordinates[0] - 1, snakeCoordinates[1]);
            } else {
                unshiftSnakeTail(snakeTail, 17, snakeCoordinates[1]);
            }
            break;
        case 'up':
            if (snakeCoordinates[1] < 17) {
                unshiftSnakeTail(snakeTail, snakeCoordinates[0], +snakeCoordinates[1] + 1);
            } else {
                unshiftSnakeTail(snakeTail, snakeCoordinates[0], 1);
            }
            break;
        case 'down':
            if (snakeCoordinates[1] > 1) {
                unshiftSnakeTail(snakeTail, snakeCoordinates[0], snakeCoordinates[1] - 1);
            } else {
                unshiftSnakeTail(snakeTail, snakeCoordinates[0], 17);
            }
            break;
        default:
            break;
    }

    if (snakeTail[0].getAttribute('positionX') == food.getAttribute('positionX') && 
        snakeTail[0].getAttribute('positionY') == food.getAttribute('positionY')) {
            food.classList.remove('food');
            let a = snakeTail[snakeTail.length - 1].getAttribute('positionX');
            let b = snakeTail[snakeTail.length - 1].getAttribute('positionY');
            snakeTail.push(document.querySelector(
                getSelectors(a,b)
            ));
            createFood();
            score++;
            input.value = `Score: ${score}`;
        }

    if (snakeTail[0].classList.contains('snakeTail')) {
        swal(`Score: ${score}`, 'the [E]nd of YoRHa \n ニーア オートマタ', { 
            button: {text: 'Go'}
        })
        .then(() => {
            window.location.reload();
        });
        clearInterval(interval);
    }
    
    snakeTail[0].classList.add('snakeHead');
    for (let i = 1; i < snakeTail.length; i++) {
        snakeTail[i].classList.add('snakeTail');
    }

    steps = true;
}

let interval = setInterval(move, 300);

window.addEventListener('keydown', (event) => {
    if (steps === true) {
        if (event.code === 'ArrowLeft' && direction !== 'right') {
            direction = 'left';
        } 
        else  if (event.code === 'ArrowUp' && direction !== 'down') {
            direction = 'up';
        } 
        else  if (event.code === 'ArrowRight' && direction !== 'left') {
            direction = 'right';
        } 
        else  if (event.code === 'ArrowDown' && direction !== 'up') {
            direction = 'down';
        }

        steps = false;
    } 
});

const grid = document.createElement('div');
document.body.appendChild(grid);
grid.classList.add('grid');

const lens = document.createElement('div');
document.body.appendChild(lens);
lens.classList.add('lens');