//head is first index//
let snake = {
  body:[],
  nextDirection:[]
}

let gameState = {
  apple: [9, 5],
  snake: snake,
  score: 0,
  gameOn: false
}

let music = document.getElementById("myAudio")

let gameBoard = [19,19]

let bestScore = 0



function makeGrid(){
  for(let y = 0; y < gameBoard[1]; y++){
    for(let x = 0; x < gameBoard[0]; x++){
      let newDiv = $('<div>').addClass("cell")
      newDiv.attr('id', `${x}-${y}`)
      $('.grid').append(newDiv)
    }
  }
}
makeGrid()

function makeSnake(){
    snake = {
    body: [ [13, 5], [14, 5], [15, 5], [16, 5] ],
    nextDirection: [-1, 0]
  }
}

function drawSnake(){
  const mySnake = snake.body
  for(let i = 0; i < mySnake.length; i++){
    let xCoordinate = mySnake[i][0]
    let yCoordinate = mySnake[i][1]
    let myCoor = `#${xCoordinate}-${yCoordinate}`
    $(myCoor).addClass("snake")
  }
}

function makeApple(){
  const myApple = gameState.apple
  let xCoordinate = myApple[0]
  let yCoordinate = myApple[1]
  let myCoor = `#${xCoordinate}-${yCoordinate}`
  $(myCoor).html('<img class= "apple" src="assets/food.png"/>')
}


function move_snake(){  
  let snakeHeadX = snake.body[0][0]
  let snakeHeadY = snake.body[0][1]

  snakeHeadX+= snake.nextDirection[0];
  snakeHeadY+= snake.nextDirection[1];

  let myCoor = `#${snakeHeadX}-${snakeHeadY}`
  $(myCoor).addClass("snake")
 
  snake.body.unshift([snakeHeadX, snakeHeadY]);
  
  if(appleHit() == false){
    let snakeTail = snake.body.pop()
    let snakeTailX = snakeTail[0]
    let snakeTailY = snakeTail[1]
    let myTailCo = `#${snakeTailX}-${snakeTailY}`
    $(myTailCo).removeClass("snake")
  }
}

function move_snake_up(){  
  if(snake.nextDirection[1] != 1){
    snake.nextDirection = [0, -1]
  }
}

function move_snake_down(){ 
  
  if(snake.nextDirection[1] != -1){
    snake.nextDirection = [0, 1]
  }
}

function move_snake_right(){  
  if(snake.nextDirection[1] != 0){
    snake.nextDirection = [1, 0]
  }
}

function move_snake_left(){  
  if(snake.nextDirection[1] != 0){
    snake.nextDirection = [-1, 0]
  }
}

function wallHit(){
  let snakeHeadX = snake.body[0][0]
  let snakeHeadY = snake.body[0][1]

  if(snakeHeadX > gameBoard[0] || 
      snakeHeadX < 0 ||
      snakeHeadY > gameBoard[1] ||
      snakeHeadY < 0){
    gameEnd()
  }
}

function selfHit(){
  let snakeHeadX = snake.body[0][0]
  let snakeHeadY = snake.body[0][1]

  const mySnake = snake.body
  for(let i = 1; i < mySnake.length; i++){
    let xCoordinate = mySnake[i][0]
    let yCoordinate = mySnake[i][1]
    if(snakeHeadX == xCoordinate && snakeHeadY == yCoordinate){
        gameEnd()
    }
  }
}

function appleHit(){
  let snakeHeadX = snake.body[0][0]
  let snakeHeadY = snake.body[0][1]

  if(snakeHeadX == gameState.apple[0] && snakeHeadY == gameState.apple[1]){
    gameState.score++
    $(`#score`).html(gameState.score)
    let myCoor = `#${snakeHeadX}-${snakeHeadY}`
    $(myCoor).html('')
    gameState.apple[0] = Math.floor(Math.random()*gameBoard[0])
    gameState.apple[1] = Math.floor(Math.random()*gameBoard[1])
    makeApple()
    clearInterval(timer)
    timer = setInterval(tick, (10000 - (snake.body.length * 300)) / 30)
    return true
  } return false
}


  $('.start button').click(function(){
    buildInitialState()
    gameState.gameOn = true
    music.play()
    $('.gameOver').hide()
    $('.instructions').hide()
  })

  
function buildInitialState() {
  makeSnake()
  makeApple()
};

let timer = setInterval(tick, 10000 / 30) // as close to 30 frames per second as possible

function tick() {
  if(gameState.gameOn){
    move_snake()
    wallHit()
    selfHit()
    appleHit()
    if(gameState.gameOn){
      drawSnake()
    }
  }
}

function gameEnd(){
  gameState.gameOn = false
  let numberOfKirbys = snake.body.length
  $('.kirbysCollected').html(numberOfKirbys)
  $('.TotalScore').html(gameState.score)
  if(bestScore < gameState.score){
    bestScore = gameState.score
  }
  $('.bestScore').html(bestScore)
  gameState.score = 0
  $('#score').html("0")
  $('.gameOver').show()
  $('.cell').removeClass('snake')
  clearInterval(timer)
  timer = setInterval(tick, 10000 / 30)
}



$(window).on('keydown', function (event) {
  if (event.keyCode == "87" || event.keyCode == "38"){
    move_snake_up()
  } else if (event.keyCode == "68" || event.keyCode == "39"){
    move_snake_right()
  } else if (event.keyCode == "65" || event.keyCode == "37"){
    move_snake_left()
  } else if (event.keyCode == "83" || event.keyCode == "40"){
    move_snake_down()
  }

  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
}
  // here you might read which key was pressed and update the state accordingly
})
