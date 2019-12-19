//thanks to Anatoliy of "Stack Overflow" for this "Random Color" function!
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function christmasroom(){
    var canvas = document.getElementById("christmas");
    var ctx = canvas.getContext("2d");

    //to increase resolution    
    var scale = 1;

    canvas.width = 1120 * scale;
    canvas.height = 630 * scale;

    var animation = null;

    var presentanimation = null;

    var platformanimation = null;

    var g = 0.5;

    var targetcount = 0;

    //keeps track of time in frames.
    var t = 10000;
    
    function Santa(){
        this.x = 400;
        this.y = 350;

        this.w = 133;
        this.h = 142;

        this.vx = 0;
        this.vy = 0;
    }

    function Projectile(xp,yp,vxp,vyp){
        this.x = xp;
        this.y = yp;
        
        this.w = 20;
        this.h = 20;

        this.filling = getRandomColor();

        this.vx = vxp;
        this.vy = vyp;
    }

    function Target(xp,yp,vxp,vyp){
        this.x = xp;
        this.y = yp;
        
        this.w = 100;
        this.h = 10;

        this.filling = getRandomColor();

        this.vx = vxp;
        this.vy = vyp;
    }

    var nick = new Santa();

    var present = new Projectile();

    var platform = new Target();

    var img = new Image();

    img.src = "santaclaus.png";
    
    // var projectileimg = new Image();

    // projectileimg.src = "blade-drag.png";

    this.drawSanta = function(){
        img.addEventListener("load", function() { 
            ctx.drawImage(img,nick.x,nick.y,nick.w,nick.h);
        });
    }

    this.moveSanta = function(){
        this.headsUpDisplay();
        this.determineGameOver();
        ctx.clearRect(nick.x - 1,nick.y - 1,nick.w + 2,nick.h + 2);

        nick.x = nick.x + nick.vx;
        nick.y = nick.y + nick.vy;

                if(nick.y < 350){
                        nick.vy = nick.vy + g;
                }else{
                        nick.vy = 0;
                }
        
        ctx.drawImage(img,nick.x,nick.y,nick.w,nick.h);

        this.controlPresentThrow();
        this.presentThrow();
        window.clearInterval(presentanimation);
        t = t - 1;
        animation = window.requestAnimationFrame(this.moveSanta.bind(this));
    }

    this.controlSanta = function(){
            document.addEventListener("keydown", function(event){
                var yourInput = event.key;
                if(yourInput == "d" && nick.x <= (canvas.width - nick.w)){
                    nick.vx = 5;
                }
                else if(yourInput == "a" && nick.x >= 0){
                    nick.vx = -5;
                }
                else{
                    nick.vx = 0;
                }
            });

            document.addEventListener("keyup", function(){
                nick.vx = 0;
            });
        
            document.addEventListener("keypress", function(event){
                var yourInput = event.key;
                if(yourInput == "s" && nick.y >= 350){
                    nick.vy = -10;
                }
                else{
                    nick.vy = 0;
                }
            });
            
            

        }

    this.presentThrow = function(){

        ctx.clearRect(present.x - 1,present.y - 1,present.w + 2,present.h + 2);
        
        present.vy = present.vy + g;

        present.x = present.x + present.vx;
        present.y = present.y + present.vy;

        ctx.fillStyle = present.filling;
        ctx.fillRect(present.x,present.y,present.w,present.h);

        // ctx.drawImage(projectileimg,present.x,present.y,present.w,present.h);
        
        presentanimation = window.setInterval(this.presentThrow,100);
        //hairanimation = window.requestAnimationFrame(this.hairWhip.bind(this));   
            
    }

    this.controlPresentThrow = function(){

        document.addEventListener("keypress", function(event){
                    var yourInput = event.key;
                    if(yourInput == "e"){
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        present = new Projectile(nick.x,nick.y,15,0);
                    }
                    else if(yourInput == "q"){
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        present = new Projectile(nick.x,nick.y,-15,0);
                    }
            else if(yourInput == "w"){
                ctx.clearRect(0,0,canvas.width,canvas.height);
                present = new Projectile(nick.x,nick.y,0,-15);
            } 
            
            // else if(yourInput == "w" && yourInput == "e"){

            // } else if(yourInput == "w" && yourInput == "q"){

            // } else {

            // }
            


            //this.hairWhip();
        });

        
    }

    this.movePlatform = function(){

        ctx.clearRect(platform.x - 1,platform.y - 1,platform.w + 2,platform.h + 2);

        platform.x = platform.x + platform.vx;
        platform.y = platform.y + platform.vy;

        ctx.fillStyle = platform.filling;
        ctx.fillRect(platform.x,platform.y,platform.w,platform.h);
        
        room.hitPlatform();
        
        platformanimation = window.requestAnimationFrame(this.movePlatform.bind(this));
    
            
    }

    this.generatePlatform = function(){
        window.cancelAnimationFrame(platformanimation);
        ctx.clearRect(0,0,canvas.width,canvas.height);

        var xp = Math.round(Math.random()) * canvas.width;
        var yp = Math.random() * canvas.height;
        
        if(xp < canvas.width / 2){
            var vxp = 10;
            var vyp = 0;
        } else {
            var vxp = -10;
            var vyp = 0;
        }
        
        platform = new Target(xp,yp,vxp,vyp);
    }

    this.hitPlatform = function(){
        if((present.x + present.w) >= platform.x && present.x <= (platform.x + platform.w) && present.x >= platform.x &&
            (present.y + present.h) >= platform.y && present.y <= (platform.y + platform.h)){
                ctx.clearRect(present.x - 1,present.y - 1,present.w + 2,present.h + 2);
                ctx.clearRect(platform.x - 1,platform.y - 1,platform.w + 2,platform.h + 2);
                present = 0;
                platform = 0;
                targetcount = targetcount + 1;

        }
    }

    this.headsUpDisplay = function(){
        document.getElementById("hud").innerHTML =  "Time: " + Math.trunc(t/100) + " Targets Hit: " + targetcount;
    }

    this.determineGameOver = function(){
        if(t <= 0){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            window.cancelAnimationFrame(animation);
            window.cancelAnimationFrame(platformanimation);
            window.clearInterval(presentanimation);
            ctx.font = ("50px Arial");
            ctx.fillText("Game over! Targets hit: " + targetcount,400,300);
        }
    }

    this.init = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        targetcount = 0;
        t = 10000;
        nick = new Santa();
    }

}

var room = new christmasroom();
document.getElementById("restartBtn").addEventListener("click",function(){
    room.init();
});

room.drawSanta();
room.moveSanta();
room.controlSanta();
// room.headsUpDisplay();
window.setInterval(function(){room.generatePlatform();room.movePlatform();},1500);