/*
mode0: start screen
mode1: game
mode2: build
*/
var mode = 0;
var block =[[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],

            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],

            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],

            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
            [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0]];
var snake = [{x:9,y:9}, {x:8,y:9}, {x:7,y:9}, {x:6,y:9}, {x:5,y:9}];
var food = {x:20,y:9};
var direction = 0; /* 0: right, 1: left, 2: up, 3: down */
var score = 0;
var high_score = 0;
var game_over = 0;

var bgm;
var button;
var eating;

function preload() {
  bgm = loadSound('assets/MOKX - Horizon (EDM).mp3');
  button = loadSound('assets/243020__plasterbrain__game-start.ogg');
  eating = loadSound('assets/17940__zippi1__sound-jupee2.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // any additional setup code goes here
    frameRate(15);
    bgm.play();
}

function draw() {
    // your "draw loop" code goes here
    background(0);
    noFill();
    stroke(255);
    rect(0, 0, 600, 400);
    fill(255);
    var s;
    if (mode == 0) {
      textSize(100);
      s = "Snake";
      text(s, 300-textWidth(s)/2, 150);
      textSize(25);
      s = "Start Game";
      text(s, 300-textWidth(s)/2, 250);
      if (mouseX>300-textWidth(s)/2 && mouseX<300+textWidth(s)/2
          && mouseY>225 && mouseY<250) {
        line(300-textWidth(s)/2, 255, 300+textWidth(s)/2, 255);
      }
      s = "Build Map";
      text(s, 300-textWidth(s)/2, 290);
      if (mouseX>300-textWidth(s)/2 && mouseX<300+textWidth(s)/2
          && mouseY>270 && mouseY<290) {
        line(300-textWidth(s)/2, 295, 300+textWidth(s)/2, 295);
      }
      textSize(16);
      s = "Instruction: click button to start game"
      text(s, 0, 430);
    } else if (mode == 1) {
      textSize(25);
      s = "Score";
      text(s, 700-textWidth(s)/2, 90);
      text(score, 700-textWidth(score)/2, 120);
      s = "High Score";
      text(s, 700-textWidth(s)/2, 160);
      text(high_score, 700-textWidth(high_score)/2, 190);
      s = "Restart";
      text(s, 700-textWidth(s)/2, 250);
      if (mouseX>700-textWidth(s)/2 && mouseX<700+textWidth(s)/2
          && mouseY>225 && mouseY<250) {
        line(700-textWidth(s)/2, 255, 700+textWidth(s)/2, 255);
      }
      s = "Back";
      text(s, 700-textWidth(s)/2, 290);
      if (mouseX>700-textWidth(s)/2 && mouseX<700+textWidth(s)/2
          && mouseY>270 && mouseY<290) {
        line(700-textWidth(s)/2, 295, 700+textWidth(s)/2, 295);
      }
      textSize(16);
      s = "Instruction: use arrows to control the snake"
      text(s, 0, 430);

      /* draw blocks */
      noStroke();
      push();
        fill(180, 120, 20);
        for (var i = 0; i < 20; i++) {
          for (var j = 0; j < 30; j++) {
            if (block[i][j] == 1) {
              rect(j*20, i*20, 20, 20);
            }
          }
        }
      pop();

      /* draw snake */
      snake.map(p => rect(p.x*20, p.y*20, 20, 20));
      /* draw food */
      ellipse(food.x*20+10, food.y*20+10, 20, 20);

      /* check game status */
      if (game_over == 1) {
        textSize(100);
        fill(255, 255, 0);
        s = "Game Over";
        text(s, 300-textWidth(s)/2, 150);
        return;
      }

      /* move snake */
      var head = snake[0];
      var tail = snake[snake.length-1];
      var next = {x: 0, y: 0};
      if (direction == 0) {
        /* right */
        next.x = (head.x + 1) % 30;
        next.y = head.y;
      } else if (direction == 1) {
        /* left */
        next.x = (head.x - 1 + 30) % 30;
        next.y = head.y;
      } else if (direction == 2) {
        /* up */
        next.x = head.x;
        next.y = (head.y - 1 + 20) % 20;
      } else if (direction == 3) {
        /* down */
        next.x = head.x;
        next.y = (head.y + 1) % 20;
      } else {
        console.log("unexpected direction in draw loop");
      }
      if (next.x == food.x && next.y == food.y) {
        /* eat food */
        eating.play();
        snake.unshift(next);
        score += 5;
        while (snake.some(function(p) {return p.x==food.x && p.y==food.y;})
                || block[food.y][food.x] == 1) {
          food.x = floor(random(0, 30));
          food.y = floor(random(0, 20));
        }
      } else if (block[next.y][next.x] == 1) {
        /* hit on the wall */
        game_over = 1;
        if (score > high_score) {
          high_score = score;
        }
      } else if (snake.some(function(p) {return p.x==next.x && p.y==next.y;})) {
        /* hit on the body */
        game_over = 1;
        if (score > high_score) {
          high_score = score;
        }
      } else {
        /* move */
        snake.pop();
        snake.unshift(next);
      }
    } else if (mode == 2) {
      textSize(25);
      s = "Clear All";
      text(s, 700-textWidth(s)/2, 250);
      if (mouseX>700-textWidth(s)/2 && mouseX<700+textWidth(s)/2
          && mouseY>225 && mouseY<250) {
        line(700-textWidth(s)/2, 255, 700+textWidth(s)/2, 255);
      }
      s = "Save & Back";
      text(s, 700-textWidth(s)/2, 290);
      if (mouseX>700-textWidth(s)/2 && mouseX<700+textWidth(s)/2
          && mouseY>270 && mouseY<290) {
        line(700-textWidth(s)/2, 295, 700+textWidth(s)/2, 295);
      }
      textSize(16);
      s = "Instruction: click on the map to set obstacles"
      text(s, 0, 430);

      /* draw blocks */
      noStroke();
      fill(180, 120, 20);
      for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 30; j++) {
          if (block[i][j] == 1) {
            rect(j*20, i*20, 20, 20);
          }
        }
      }
    } else {
      console.log("unexpected mode in draw loop");
    }
}

// for info on handling key presses, see the FAQ:
// https://cs.anu.edu.au/courses/comp1720/assignments/03-simple-arcade-game/#handling-keypresses

function mousePressed() {
    // your "mouse pressed" code goes here
    var s;
    if (mode == 0) {
      textSize(25);
      s = "Start Game";
      if (mouseX>300-textWidth(s)/2 && mouseX<300+textWidth(s)/2
          && mouseY>225 && mouseY<250) {
        mode = 1;
        bgm.stop();
        button.play();
        bgm.play();
      }
      s = "Build Map";
      if (mouseX>300-textWidth(s)/2 && mouseX<300+textWidth(s)/2
          && mouseY>270 && mouseY<295) {
        mode = 2;
        bgm.stop();
        button.play();
        bgm.play();
      }
    } else if (mode == 1) {
      textSize(25);
      s = "Restart";
      text(s, 700-textWidth(s)/2, 250);
      if (mouseX>700-textWidth(s)/2 && mouseX<700+textWidth(s)/2
          && mouseY>225 && mouseY<250) {
        snake = [{x:9,y:9}, {x:8,y:9}, {x:7,y:9}, {x:6,y:9}, {x:5,y:9}];
        food = {x:20,y:9};
        score = 0;
        game_over = 0;
        direction = 0;
        bgm.stop();
        button.play();
        bgm.play();
      }
      s = "Back";
      text(s, 700-textWidth(s)/2, 290);
      if (mouseX>700-textWidth(s)/2 && mouseX<700+textWidth(s)/2
          && mouseY>270 && mouseY<290) {
        snake = [{x:9,y:9}, {x:8,y:9}, {x:7,y:9}, {x:6,y:9}, {x:5,y:9}];
        food = {x:20,y:9};
        score = 0;
        game_over = 0;
        direction = 0;
        mode = 0;
        bgm.stop();
        button.play();
        bgm.play();
      }
    } else if (mode == 2) {
      textSize(25);
      s = "Clear All";
      if (mouseX>700-textWidth(s)/2 && mouseX<700+textWidth(s)/2
          && mouseY>225 && mouseY<250) {
        for (var i = 0; i < 20; i++) {
          for (var j = 0; j < 30; j++) {
            block[i][j] = 0;
          }
        }
        button.play();
      }
      s = "Save & Back";
      if (mouseX>700-textWidth(s)/2 && mouseX<700+textWidth(s)/2
          && mouseY>270 && mouseY<290) {
        mode = 0;
        bgm.stop();
        button.play();
        bgm.play();
      }

      /* set blocks */
      for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 30; j++) {
          if (mouseX>j*20 && mouseX<(j+1)*20
              && mouseY>i*20 && mouseY<(i+1)*20) {
            block[i][j] = 1;
          }
        }
      }
    } else {
      console.log("unexpected mode in mousePressed");
    }
}

function keyPressed() {
  if (mode == 1) {
    if (direction == 0 || direction == 1) {
      /* right or left */
      if (keyCode == UP_ARROW) {
        direction = 2;
      } else if (keyCode == DOWN_ARROW) {
        direction = 3;
      }
    } else if (direction == 2 || direction == 3) {
      /* up or down */
      if (keyCode == LEFT_ARROW) {
        direction = 1;
      } else if (keyCode == RIGHT_ARROW) {
        direction = 0;
      }
    } else {
      console.log("unexpected direction in keyPressed");
    }
  }
  return false;
}
