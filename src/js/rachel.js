function rachelsroom(){
    var canvas = document.getElementById("city");
    var ctx = canvas.getContext("2d");

    //to increase resolution    
    var scale = 1;

    canvas.width = 1120 * scale;
    canvas.height = 630 * scale;

    var animation = null;

    var hairanimation = null;

    var g = 0.5;
    
    function Rapunzel(){
        this.x = 400;
        this.y = 350;

        this.w = 140;
        this.h = 250;

        this.vx = 0;
        this.vy = 0;
    }

    function hair(){
        this.l = 0;
        this.w = 20;

        this.lx = 0;
        this.ly = 0;

        this.color1 = '#FFD700'; //"blondish" color
        this.color2 = '#FAFAD2'; //lighter color

        this.grad = null; //gradient

        this.angle = 0;

        this.v = 0;

        this.vx = 0;
        this.vy = 0;

        this.lmax = 500;

        this.extending = false;
    }

    var rachel = new Rapunzel();

    var rachelhair = new hair();

    var img = new Image();

    img.src = "SailorRapunzelEdited.png";

    this.drawRachel = function(){
        img.addEventListener("load", function() {
            ctx.drawImage(img,rachel.x,rachel.y,rachel.w,rachel.h);
        });
    }

    this.moveRachel = function(){
        ctx.clearRect(rachel.x - 1,rachel.y - 1,rachel.w + 2,rachel.h + 2);

        rachel.x = rachel.x + rachel.vx;
        rachel.y = rachel.y + rachel.vy;

                if(rachel.y < 350){
                        rachel.vy = rachel.vy + g;
                }else{
                        rachel.vy = 0;
                }
        
        ctx.drawImage(img,rachel.x,rachel.y,rachel.w,rachel.h);

        this.controlHairWhip();
        this.hairWhip();

        animation = window.requestAnimationFrame(this.moveRachel.bind(this));
    }

    this.controlRachel = function(){
            document.addEventListener("keydown", function(event){
                var yourInput = event.key;
                if(yourInput == "d" && rachel.x <= (canvas.width - rachel.w)){
                    rachel.vx = 5;
                }
                else if(yourInput == "a" && rachel.x >= 0){
                    rachel.vx = -5;
                }
                else{
                    rachel.vx = 0;
                }
            });

            document.addEventListener("keyup", function(){
                rachel.vx = 0;
            });
        
            document.addEventListener("keypress", function(event){
                var yourInput = event.key;
                if(yourInput == "s" && rachel.y >= 350){
                    rachel.vy = -10;
                }
                else{
                    rachel.vy = 0;
                }
            });
            
            

        }

    this.hairWhip = function(){

        rachelhair.grad = ctx.createRadialGradient(rachel.x,rachel.y,rachel.h,rachel.x,rachel.y,rachelhair.lmax);
        rachelhair.grad.addColorStop(0,rachelhair.color1);
        rachelhair.grad.addColorStop(1,rachelhair.color2);

        if(rachelhair.v > 0){
            if(rachelhair.lx * rachelhair.lx + rachelhair.ly * rachelhair.ly < rachelhair.lmax * rachelhair.lmax
            && rachelhair.extending == true){
                rachelhair.lx = rachelhair.lx + rachelhair.vx;
                rachelhair.ly = rachelhair.ly + rachelhair.vy;

                ctx.beginPath();
                ctx.arc(rachel.x + rachel.w / 2 + rachelhair.lx, rachel.y + rachel.h / 2 + rachelhair.ly,
                rachelhair.w, 0, 2 * Math.PI)
                ctx.fillStyle = rachelhair.grad;
                ctx.fill();
                if(rachelhair.lx * rachelhair.lx + rachelhair.ly * rachelhair.ly >= rachelhair.lmax * rachelhair.lmax){
                    rachelhair.extending = false;
                }
            }

            else if(rachelhair.extending == false){
                rachelhair.lx = rachelhair.lx - rachelhair.vx;
                rachelhair.ly = rachelhair.ly - rachelhair.vy;

                ctx.clearRect(rachel.x + rachel.w / 2 + rachelhair.lx - rachelhair.w - 1,
                        rachel.y + rachel.h / 2 + rachelhair.ly - rachelhair.w - 1,
                        2 * rachelhair.w + 2, 2 * rachelhair.w + 2);
                if(rachelhair.lx * rachelhair.lx + rachelhair.ly * rachelhair.ly <= 0){
                        rachelhair.v = 0;
                        rachelhair.vx = rachelhair.v * Math.cos(rachelhair.angle);
                        rachelhair.vy = rachelhair.v * Math.sin(rachelhair.angle);
                        window.clearInterval(hairanimation);
                }
                
                

            }
            
        }
        
        hairanimation = window.setInterval(this.hairWhip,100);
        //hairanimation = window.requestAnimationFrame(this.hairWhip.bind(this));    
            
    }

    this.controlHairWhip = function(){

        document.addEventListener("keypress", function(event){
                    var yourInput = event.key;
                    if(yourInput == "e"){
                            rachelhair.angle = 0;
                rachelhair.v = 1;
                rachelhair.vx = rachelhair.v * Math.cos(rachelhair.angle);
                rachelhair.vy = rachelhair.v * Math.sin(rachelhair.angle);

                rachelhair.lx = 0;
                rachelhair.ly = 0;
            
                rachelhair.extending = true;
                    }
                    else if(yourInput == "q"){
                            rachelhair.angle = Math.PI;
                rachelhair.v = 1;
                rachelhair.vx = rachelhair.v * Math.cos(rachelhair.angle);
                rachelhair.vy = rachelhair.v * Math.sin(rachelhair.angle);

                rachelhair.lx = 0;
                rachelhair.ly = 0;
            
                rachelhair.extending = true;
                    }
            else if(yourInput == "w"){
                rachelhair.angle = 3 * Math.PI / 2;
                rachelhair.v = 1;
                rachelhair.vx = rachelhair.v * Math.cos(rachelhair.angle);
                rachelhair.vy = rachelhair.v * Math.sin(rachelhair.angle);

                rachelhair.lx = 0;
                rachelhair.ly = 0;
            
                rachelhair.extending = true;
            } else if(yourInput == "w" && yourInput == "e"){
                rachelhair.angle = 7 * Math.PI / 4;
                rachelhair.v = 1;
                rachelhair.vx = rachelhair.v * Math.cos(rachelhair.angle);
                rachelhair.vy = rachelhair.v * Math.sin(rachelhair.angle);

                rachelhair.lx = 0;
                rachelhair.ly = 0;
            
                rachelhair.extending = true;
            } else if(yourInput == "w" && yourInput == "q"){
                rachelhair.angle = 5 * Math.PI / 4;
                rachelhair.v = 1;
                rachelhair.vx = rachelhair.v * Math.cos(rachelhair.angle);
                rachelhair.vy = rachelhair.v * Math.sin(rachelhair.angle);

                rachelhair.lx = 0;
                rachelhair.ly = 0;
            
                rachelhair.extending = true;
            } else {

                rachelhair.v = 0;
                rachelhair.vx = rachelhair.v * Math.cos(rachelhair.angle);
                rachelhair.vy = rachelhair.v * Math.sin(rachelhair.angle);

                rachelhair.lx = 0;
                rachelhair.ly = 0;
            
                rachelhair.extending = false;
            }
            


            //this.hairWhip();
                });

        
    }
}

var room = new rachelsroom();
room.drawRachel();
room.moveRachel();
room.controlRachel();