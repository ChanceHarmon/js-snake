'use strict'
console.log('script connected')
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
const box = 32;

const ground = new Image();
ground.src = 'img/ground.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

let deadSound = new Audio();
let foodSound = new Audio();
let upKeySound = new Audio();
let rightKeySound = new Audio();
let leftKeySound = new Audio();
let downKeySound = new Audio();

deadSound.src = 'audio/dead.mp3';
foodSound.src = 'audio/food.mp3';
upKeySound.src = 'audio/up.mp3';
rightKeySound.src = 'audio/right.mp3';
leftKeySound.src = 'audio/left.mp3';
downKeySound.src = 'audio/down.mp3';

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

let score = 0;

let d;

const direction = (event) => {
  let key = event.keyCode;
  if (key === 37 && d !== 'RIGHT') {
    d = 'LEFT';
    //leftKeySound.play();
  } else if (key === 38 && d !== 'DOWN') {
    d = 'UP';
    //upKeySound.play();
  } else if (key === 39 && d !== 'LEFT') {
    d = 'RIGHT';
    //rightKeySound.play();
  } else if (key === 40 && d !== 'UP') {
    d = 'DOWN';
    //upKeySound.play();
  }
}
console.log(direction);
document.addEventListener('keydown', direction);
const collision = (head, array) => {
  for (let i = 0; i < snake.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

const draw = () => {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? 'green' : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImg, food.x, food.y);
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d === 'LEFT') snakeX -= box;
  if (d === 'UP') snakeY -= box;
  if (d === 'RIGHT') snakeX += box;
  if (d === 'DOWN') snakeY += box;
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    foodSound.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    snake.pop();
  }
  let newHead = {
    x: snakeX,
    y: snakeY
  }
  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game);
    //deadSound.play();
  }
  snake.unshift(newHead);
  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 200);
