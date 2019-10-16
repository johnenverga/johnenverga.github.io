//thanks to Anatoliy of "Stack Overflow" for this "Random Color" function!
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  var physicssim = (function(){
  
  var c = document.getElementById("physicsroom");
  var ctx = c.getContext("2d");
  
  var animation = null;
  
  //time
  var t = 0;
  
  //gravitational acceleration toward bottom of sim/canvas
  var g = 1;

  //variables to store inputs

  var gInput = 1;
  
  var xinit = 50;
  var yinit = 50;

  var rinit = 10;

  var speedinit = 0;

  var initdir = 0;

  var compressionInput = 20;

  var ball = {
      
      //position of ball's center
          x: 20,
          y: 20,
  
      //radius and color of ball
      r: 10,
          filling: getRandomColor(),
      
      //direction in radians
          dir: Math.PI * 0,
  
      //cosine and sine of angle relative to left wall
      wallcos: 0,
      wallsin: 0,
  
      //new direction after a collision
      newdir: 0,
          
      // Add a speed property to the player this is the number of pixels
          //the player will move each frame
          speed: 0,
  
      //x and y components of ball's speed
      //vx: this.speed*Math.cos(this.dir),
      vx: 0,
      vxold: 0,
      //vy: this.speed*Math.sin(this.dir),
      vy: 0,
      vyold: 0,
  
      //bounce velocity
      bouncex: 0,
      bouncey: 0,
  
      //"compression distance" and "bounce" factor, which is a ratio of compression distance and ball diameter.
      compression: 20,
      bounce: 1,
  
      bouncetime: 0
        }
  
      return{
  
      movingBall: function(){
  
      ball.vxold = ball.vx;
      ball.vyold = ball.vy;
  
      ball.speed = Math.sqrt(ball.vxold * ball.vxold + ball.vyold * ball.vyold);
      ball.dir = Math.atan2(ball.vyold, ball.vxold);
  
      ball.vx = ball.speed * Math.cos(ball.dir);
      ball.vy = ball.speed * Math.sin(ball.dir) + g;
  
      ball.vx = (ball.vx + ball.vxold) / 2;
      ball.vy = (ball.vy + ball.vyold) / 2;
  
      
      //ball.bouncetime = ball.bouncetime + 1;
      t = t + 1;
      
      if(ball.x <= ball.r || ball.x >= (c.width - ball.r) || ball.y <= ball.r || ball.y >= (c.height - ball.r)){
      this.wallCollision();
      
      ball.bounce = ball.compression / (2 * ball.r);
      ball.bouncex = ball.bounce * ball.speed * Math.cos(ball.dir);
      ball.bouncey = ball.bounce * ball.speed * Math.sin(ball.dir);
  
      
      //Find a way to accurately portray bounces.
      ball.vx = ball.bouncex;
      ball.vy = ball.bouncey;
  
      
  
      
      }
  
      ctx.clearRect(ball.x - (1 + ball.r), ball.y - (1 + ball.r), 2*ball.r + 2, 2*ball.r + 2);
      
      ball.x = ball.x + ball.vx;
      ball.y = ball.y + ball.vy;
      
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = ball.filling;
      ctx.fill();
      },
  
      wallCollision: function(){
      
      //if(ball.vx == 0 && ball.vy > 0){
      //    ball.dir = Math.PI / 2;
      //} else if(ball.vx == 0 && ball.vy < 0) {
      //    ball.dir = Math.PI * 3 / 2;
          
      //} else {
          ball.dir = Math.atan2(ball.vy,ball.vx);
      //}
      
      
          if(ball.x <= ball.r || ball.x >= (c.width - ball.r)){
              ball.wallsin = Math.sin(Math.PI - ball.dir);
              ball.wallcos = Math.cos(Math.PI - ball.dir);
              //ball.newdir = Math.PI - Math.atan2(ball.vy,ball.vx);
              ball.dir = Math.PI - ball.dir;
              ball.filling = getRandomColor();
          }    
          if(ball.y <= ball.r || ball.y >= (c.height - ball.r)){
              ball.wallsin = Math.sin(2 * Math.PI - ball.dir);
              ball.wallcos = Math.cos(2 * Math.PI - ball.dir);
              //ball.newdir = Math.atan2(ball.vy,ball.vx);
              ball.dir = 2 * Math.PI - ball.dir;
              ball.filling = getRandomColor();
          }
      
      },
  
      animate: function(){
  
      this.movingBall();
      
      document.getElementById("time").innerText = "time: " + Math.trunc(t/60) + " sec.";
      animation = window.requestAnimationFrame(this.animate.bind(this));
  
      //window.setTimeout(animation, 16.7);
      
      },
  
      animationStatus: function(){
      return animation;
  
      },
  
      stopAnimation: function(){
      
      window.cancelAnimationFrame(animation);
  
      },
  
      setInitialValues: function(){
    
        gInput = document.getElementById("gravity").value;
        gInput = Number(gInput);

        rinit = document.getElementById("radius").value;
        rinit = Number(rinit);
    
      xinit = document.getElementById("xzero").value;
      xinit = Number(xinit);
      yinit = document.getElementById("yzero").value;
      yinit = Number(yinit);

      initdir = document.getElementById("angle").value;
        initdir = Number(initdir) * Math.PI;

        speedinit = document.getElementById("speedzero").value;
        speedinit = Number(speedinit);

        compressionInput = document.getElementById("compressionzero").value;
        compressionInput = Number(compressionInput);



    


      },
  
      init: function(){
  
      ctx.clearRect(0, 0, c.width, c.height);
      
      animation = null;
  
      t = 0;
  
      g = gInput;
      
      ball.x = xinit;
      ball.y = yinit;
  
      ball.r = rinit;
      ball.filling = getRandomColor();
  
      ball.dir = initdir;
      ball.speed = speedinit;
  
      ball.vx = ball.speed * Math.cos(ball.dir);
      ball.vy = ball.speed * Math.sin(ball.dir) + g;
  
      ball.compression = compressionInput;
  
      this.animate();
      },
  
  }
  
  })();
      
  document.getElementById("restartBtn").addEventListener("click", function(){
  if(physicssim.animationStatus() == null){
      physicssim.setInitialValues();
      physicssim.init();
  }
  else{
      physicssim.stopAnimation();
      physicssim.setInitialValues();
      physicssim.init();
  }
  });
