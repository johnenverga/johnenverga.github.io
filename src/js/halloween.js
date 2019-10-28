function halloweenRoom(){

    var canvas = document.getElementById("Halloween");
    var ctx = canvas.getContext("2d");

    //position related

    var x = 100;
    var y = 100;

    //pumpkin dimensions

    var w = 39;
    var h = 36;

    //pumpkin speed

    var vx = 0;
    var vy = 0;

    //gravity

    var g = 0.5;

    //hit points

    var hp = 10;

    //invincibility timer

    var invincibility = 0;

    var animation = null;
    var projectileanimation = null;
    var enemyanimation = null;

    var gameOver = false;
    
    function projectile(xp,yp,vxp,vyp){

        this.x = xp;
        this.y = yp;

        this.w = 10;
        this.h = 10;

        this.vx = vxp;
        this.vy = vyp;

    }

    function enemy(xe,ye,we,he,vxe,vye){

        this.x = xe;
        this.y = ye;
        
        this.w = we;
        this.h = he;

        this.vx = vxe;
        this.vy = vye;

    }

    var candycorn = 0;

    var ghost = 0; //change into array for multiple ghosts?

    var img = new Image();

    var projectileimg = new Image();

    var ghostimg = new Image();

    projectileimg.src = 'Candycorn.png';

    

    this.drawPumpkin = function(){

        img.addEventListener('load', function() {
              ctx.drawImage(img,x,y,w,h);
        }, false);

        //may change if necessary
        img.src = 'pumpkin.png';

    }

    this.movePumpkin = function(){
        ctx.clearRect(x - 1, y - 1, w + 2, h + 2);

        x = x + vx;
        y = y + vy;
        
        if(y < 100){
            vy = vy + g;
        }else{
            vy = 0;
        }

        //img.addEventListener('load', function() {
              ctx.drawImage(img,x,y,w,h);
        //}, false);

        //may change if necessary
        //img.src = 'pumpkin/pumpkin.png';

        this.headsUpDisplay();
        this.pumpkinDamage();
        
        animation = window.requestAnimationFrame(this.movePumpkin.bind(this));
        
    }

    this.controlPumpkin = function(){
            document.addEventListener("keydown", function(event){
                var yourInput = event.key;
                if(yourInput == "d" && x <= (canvas.width - w)){
                    vx = 1;
                }
                else if(yourInput == "a" && x >= 0){
                    vx = -1;
                }
                else{
                    vx = 0;
                }
            });

            document.addEventListener("keyup", function(){
                vx = 0;
            });
        
            document.addEventListener("keypress", function(event){
                var yourInput = event.key;
                if(yourInput == "w" && y >= 100){
                    vy = -8;
                }
                else{
                    vy = 0;
                }
            });
            
            

    }

    this.makeProjectile = function(dir){
        switch(dir){
            case "left":
                window.clearInterval(projectileanimation);
                candycorn = new projectile(x + w,y + h/2,-2,0);
                break;
            case "right":
                window.clearInterval(projectileanimation);
                candycorn = new projectile(x,y + h/2,2,0);
                break;
            case "down":
                window.clearInterval(projectileanimation);
                candycorn = new projectile(x + w/2,y + h,0,2);
                break;
            case "up":
                window.clearInterval(projectileanimation);
                candycorn = new projectile(x + w/2,y,0,-2);
                break;
            default:
                window.clearInterval(projectileanimation);
        
         }

        //projectileanimation = window.requestAnimationFrame(fireProjectile.bind(this));
    }

    this.fireProjectile = function(){

        ctx.clearRect(candycorn.x - 1,candycorn.y - 1,candycorn.w + 2,candycorn.h + 2);

        candycorn.x = candycorn.x + candycorn.vx;
        candycorn.y = candycorn.y + candycorn.vy;

        //ctx.fillStyle = '#FFFFFF';
        //ctx.fillRect(candycorn.x,candycorn.y,candycorn.w,candycorn.h);

        ctx.drawImage(projectileimg,candycorn.x,candycorn.y,candycorn.w,candycorn.h);

        projectileanimation = window.setInterval(this.fireProjectile, 10);

    }

    this.determineInAir = function(){
        if(y < 100){
            return true;
        } else {
            return false;
        }
    }

    this.spawnGhost = function(){

        window.clearInterval(enemyanimation);

        var xg = Math.round(Math.random()) * canvas.width;
        var yg = Math.random() * canvas.height;

        var wg = 20;
        var hg = 20;

        if(xg < canvas.width / 2){
            var vxg = 2;
            var vyg = 0;
        } else {
            var vxg = -2;
            var vyg = 0;
        }
        ghost = new enemy(xg,yg,wg,hg,vxg,vyg);

        img.addEventListener('load', function() {
            ctx.drawImage(ghostimg,ghost.x,ghost.y,ghost.w,ghost.h);
        }, false);

        ghostimg.src = 'ghostoriginal.png';

    }

    this.moveGhost = function(){
        ctx.clearRect(ghost.x - 1,ghost.y - 1,ghost.w + 2,ghost.h + 2);

        ghost.x = ghost.x + ghost.vx;
        ghost.y = ghost.y + ghost.vy;

        //img.addEventListener('load', function() {
            ctx.drawImage(ghostimg,ghost.x,ghost.y,ghost.w,ghost.h);
        //}, false);

        ghostimg.src = 'ghostoriginal.png';



        enemyanimation = window.setInterval(this.moveGhost, 10);
    }

    this.pumpkinDamage = function(){
        if(((x + w) >= ghost.x && x <= (ghost.x + ghost.w) && x >= ghost.x) && 
        ((y + h) >= ghost.y && y <= (ghost.y + ghost.h) && y >= ghost.y) && invincibility <= 0){
            hp = hp - 1;
            invincibility = 100;
        }
        else 
        {
            invincibility = invincibility - 1;
        }

    }

    this.headsUpDisplay = function(){
        document.getElementById("hud").innerHTML = "HP: " + hp;
    }


    this.isGameOver = function(){
        return gameOver;
    }

}

var room = new halloweenRoom();
room.drawPumpkin();

//while(room.isGameOver() == false){
    room.movePumpkin();
    room.controlPumpkin();
    


    window.setInterval(function(){room.spawnGhost();room.moveGhost();},2000);
    

    document.addEventListener("keypress", function(event){
        var yourInput = event.key;
        if(yourInput == "s" && room.determineInAir() == true){
            room.makeProjectile("down");
            room.fireProjectile();
        } else if (yourInput == "s" && room.determineInAir() == false) {
            room.makeProjectile("up");
            room.fireProjectile();
        } else if (yourInput == "e") {
            room.makeProjectile("right");
            room.fireProjectile();
        } else if (yourInput == "q") {
            room.makeProjectile("left");
            room.fireProjectile();
        }
    });

//}