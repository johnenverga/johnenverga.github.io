var game = (function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
  
    var player = {
        x:0,
        y:475,
        h: 25,
        w: 25,
        fill: '#fff',
        dir: 'right',
            // Add a speed property to the player this is the number of pixels 
    //the player will move each frame
    speed: 5
      }
    
    //Define an enemy spawn
  var spawn = {
    x: 50,
    y: 0,
    h: 10,
    w: 10,
    fill: '#ff0',
    speed: 5
  }

//1. Initialize an Object of spawns
var spawns = {}

//2. Initialize a variable for launching spawns.
var spawner = null;

  //1. Add the animation frames to a variable
  //the we can kill later
  var animation  = null;

  //2. Track the state of game over
  var gameOver = false;

  //1. Create a variable to hold the score
  var score = 0;

function launchSpawns(){
  //3. Create a new enemy spawn every 400 ms
  spawner = setInterval(()=>{
    //4. Use psuedo-random strings to name the new spawns
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    //5. Add the new spawn to the Object of Spawns
    spawns[text] = {
      x:Math.floor(Math.random()*this.canvas.width),
      y:spawn.y,
      h:spawn.h,
      w:spawn.w,
      fill:spawn.fill,
      speed:spawn.speed,
    }

  },400);
}

//6. Move all spawns
function moveSpawns(){

  //7. Loop through the Object of spawns
  //and move each one individually.
  //This will look a lot like movePlayer()
  if(Object.keys(spawns).length>0){
    for(let spawn in spawns){

      //8. Only move the spawn, if the spawn has not 
      //moved off of the screen.
      if(spawns[spawn].y<=canvas.height){

        ctx.fillStyle = spawns[spawn].fill;

        ctx.save();

        ctx.clearRect(
          spawns[spawn].x-1,
          spawns[spawn].y-spawns[spawn].speed,
          spawns[spawn].w+2,
          spawns[spawn].h+2
        );

        ctx.fillRect(
          spawns[spawn].x,
          spawns[spawn].y = (spawns[spawn].y+spawns[spawn].speed),
          spawns[spawn].w,
          spawns[spawn].h
        );

        ctx.restore();
        if (
            player.x < spawns[spawn].x + spawns[spawn].w &&
            spawns[spawn].x > player.x && spawns[spawn].x < (player.x + player.w) &&
            player.y < spawns[spawn].y + spawns[spawn].h &&
            player.y + player.h > spawns[spawn].y
          ){
            //4. If there is a collision set gameOver to true
            gameOver = true;
            //5. ...kill the animation frames
            cancelAnimationFrame(animation);
            //6. ...kill the spawner
            clearInterval(spawner);
          }  

      }else{
        //2. Increment the score when any time
            //an enemy sprite move off screen
            score = score + 10;
            //3. Write the score to a separate div
            document.getElementById('score').innerHTML = score;
            delete spawns[spawn];
      }
    }
  }

}


    return {

        player: function(){
            
            ctx.fillStyle=player.fill;

                  // Define how many pixels the player
      // should move each frame (i.e. speed)

      // Add x pixels to move the player to the right
      if(player.dir === 'right'){

        ctx.clearRect(
            player.x-player.speed,
            player.y-1,
            player.w+2,
            player.h+2
          );

        ctx.fillRect(
          player.x = (player.x + player.speed),
          player.y,
          player.w,
          player.h
        );

        // Change the player direction when the player touches the edge 
        //of the canvas.
        if((player.x + player.w) >= canvas.width){
          player.dir = 'left';
        }

      }else{
        
        ctx.clearRect(
            player.x+player.speed,
            player.y-1,
            player.w+2,
            player.h+2
          );

        // Subtract x pixels to move the player to the left
        ctx.fillRect(
          player.x = (player.x - player.speed),
          player.y,
          player.w,
          player.h
        );

        // Change the player direction when the player touches the edge 
        //of the canvas.
        if(player.x <= 0){
          player.dir = 'right';
        }
      }
    },

    //Create a setter for changing the current direction of the user.
    changeDirection: function(){
      if(player.dir === 'left'){
        player.dir = 'right';
      }else if(player.dir === 'right'){
        player.dir = 'left';
      }
    },

    animate: function(){
        this.player();
        moveSpawns();
              //7. Only animate if the game is not over.
      if(gameOver===false){
        animation = window.requestAnimationFrame(this.animate.bind(this));
      }
      },

      init: function(){
        canvas.height = 600;
        canvas.width = 800;

        launchSpawns();
        this.animate();
      }
    }
  })();
  
  game.init();

  // Add a listener to allow the  user to change the direction
//of the player sprite
window.addEventListener('keyup', function(){
    game.changeDirection();
  });

  document.getElementById("btnBack").addEventListener('click', function(){
    location.assign("index.html");
  });