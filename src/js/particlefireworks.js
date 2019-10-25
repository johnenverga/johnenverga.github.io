//thanks to Anatoliy of "Stack Overflow" for this "Random Color" function!
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function particleFireworks(){

var canvas = null;
var canvasContext = null;

//initialize particle properties
function Particle(x1,y1,r1,speed1,dir1,color1)
{

    //position in pixels

    this.x = x1;
    this.y = y1;

    //physical properties, direction in radians

    this.r = r1;
    this.speed = speed1;

    this.vx = 0;
    this.vy = 0;

    this.dir = dir1;
    this.color = '#000000';

}

    //create firework particles

    var particleArray = [];

    this.getCanvasData = function(canvas,canvasContext){
        this.canvas = canvas;
        this.canvasContext = canvasContext;
    };
    
    this.createFireworkParticles = function(x1,y1,r1,speed1,count){

        for(var i = 0; i < count; i++){

        var dir1 = 2 * i * Math.PI / count;

        var color1 = getRandomColor();

        particleArray.push[new Particle(x1,y1,r1,speed1,dir1,color1)]

        }


    };

    this.clearFireworkParticles = function(){
        canvasContext.clearRect(0,0,canvas.width,canvas.height);
    };

    this.showFireworkParticles = function(){

        for(var i = 0; i < count; i++){
            canvasContext.beginPath();
            canvasContext.arc(particleArray[i].x,particleArray[i].y,particleArray[i].r,0,2*Math.PI);
            canvasContext.stroke();
            canvasContext.fillStyle(particleArray[i].color)
            canvasContext.fill();
        }

    };

}
