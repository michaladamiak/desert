const squareWidth = 10;
const canvHeight = 600;
const canvWidth = 600;
let c = 5;
let started = false;
const audio = new Audio('sand.mp3');

function setup() {
  createCanvas(canvHeight, canvWidth);
  background(51);
}

let grid = Array.from({ length: canvHeight/squareWidth }, () => new Array(canvWidth/squareWidth).fill(0));


function draw() {
  background(51);
  if (mouseIsPressed && mouseX < canvWidth-squareWidth && mouseX > squareWidth && mouseY > 0 && mouseY < canvHeight && grid[int(mouseX/squareWidth)][int(mouseY/squareWidth)] == 0) {
    // console.log(Math.random());
    started = true;
    audio.play();
    grid[int(mouseX/squareWidth)][int(mouseY/squareWidth)] = c;
    grid[int(mouseX/squareWidth)-1][int(mouseY/squareWidth)-1] = Math.min(c,Math.round(Math.random())*c);
    grid[int(mouseX/squareWidth)+1][int(mouseY/squareWidth)-1] = Math.min(c,Math.round(Math.random())*c);
  } else if(started) {
    setTimeout(() => audio.pause(), 500);
    started = false;
  }
  
  for(i=0;i<canvHeight/squareWidth;i++){
    for(j=0;j<canvWidth/squareWidth;j++){
      if(grid[i][j] > 0){
        fill(color(255, grid[i][j], 0));
        square(i*squareWidth, j*squareWidth, squareWidth)
      }
    }
  }
  
  let grid2 = Array.from({ length: canvHeight/squareWidth }, () => new Array(canvWidth/squareWidth).fill(0));
  
  for(i=0;i<canvHeight/squareWidth;i++){
    for(j=0;j<canvWidth/squareWidth;j++){
      //stop at the bottom
      if(j == canvHeight/squareWidth-1 && grid[i][j]){
        grid2[i][j] = grid[i][j];
      }
      // speed up falling if mouse is far away
      else if(grid[i][j] > 0 && grid[i][j+1] == 0 && grid[i][j+2] == 0 && j*squareWidth-mouseY>100){
        grid2[i][j+2] = grid[i][j];
      }
      // normal falling by 1
      else if(grid[i][j] > 0 && grid[i][j+1] == 0){
        grid2[i][j+1] = grid[i][j];
      }
      else if (grid[i][j] > 0 && grid[i][j+1] > 0){
        if(i<canvWidth/squareWidth-1 && grid[i+1][j+1] == 0){
          grid2[i+1][j+1] = grid[i][j];
        }
        else if (i>0 && grid[i-1][j+1] == 0){
          grid2[i-1][j+1] = grid[i][j];
        } else {
          grid2[i][j] = grid[i][j];
        }
      }
    }
  }
  grid = grid2;
  if(c>255){
    c=5;
  }
  c+=0.3;
}
