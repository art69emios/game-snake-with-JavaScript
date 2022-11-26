const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

let bg = new Image()
let foodImg = new Image()

bg.src = 'img/bg.png'
foodImg.src = 'img/food.png'

let score = 0
let box = 32

let foodXY = {
   x: Math.floor((Math.random() * 17 + 1) ) * box,
   y: Math.floor((Math.random() * 15 + 3) ) * box 
}

let snake = []

snake[0] = {
   x: 9 * box,
   y:10 * box
}

document.addEventListener('keydown', move)
let dir

function move(e) {
   if(e.keyCode == 37 && dir != 'left'){
      dir = 'right'
   }else if(e.keyCode == 38 && dir != 'up'){
      dir = 'down'
   }else if(e.keyCode == 39 && dir != 'right'){
      dir = 'left'
   }else if(e.keyCode == 40 && dir != 'down'){
      dir = 'up'
   }
}

function eatTail(head, array)  {
   for (let i = 0; i < array.length; i++) {
      if(head.x == array[i].x && head.y == array[i].y ){
         clearInterval(game)
      }
   }
}

function draw() {
   context.drawImage(bg, 0 , 0)
   context.drawImage(foodImg, foodXY.x, foodXY.y)
   context.fillStyle = 'white'
   context.font = '50px Arial'
   context.fillText(score, box * 2, box * 1.7)


 

   for(let i = 0; i < snake.length; i++) {
		context.fillStyle = i == 0 ? "red" : "green";
		context.fillRect(snake[i].x, snake[i].y, box, box);
	}

   let snakeX = snake[0].x;
 	let snakeY = snake[0].y;

   if(snake[0].x == foodXY.x && snake[0].y == foodXY.y){
      score++
      foodXY = {
         x: Math.floor((Math.random() * 17 + 1) ) * box,
         y: Math.floor((Math.random() * 15 + 3) ) * box 
      }
   }else{
      snake.pop()
   }

   if(snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17  ){
      clearInterval(game)
   }

   if(dir == 'left'){
      snakeX += box
   }else if(dir == 'right'){
      snakeX -= box
   }else if(dir == 'down'){
      snakeY -= box
   }else if(dir == 'up'){
      snakeY += box
   }

   let newHead = {
      x: snakeX,
      y: snakeY
   }
   eatTail(newHead, snake)
   snake.unshift(newHead)

   
}
let game = setInterval(draw, 100)

