//use this for the draw program

var draw = (function() {

    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth,
      mHeight = document.querySelector('main').offsetHeight,
  
      //Create the canvas
      canvas = document.createElement("canvas"),
  
      //Create the context
      ctx = canvas.getContext("2d"),
  
      //Create the initial bounding rectangle
      rect = canvas.getBoundingClientRect(),
  
//current x,y
x=0,
y=0,

//starting x,y
x1=0,
y1=0,

//ending x,y
x2=0,
y2=0,

//Tracks the last x,y state
lx = false,
ly = false,

color = '#000000',

//What shape are we drawing?
shape='';

isDrawing=false;
  
    return {
      //Set the x,y coords based on current event data
      setXY: function(evt) {
          //Track the last x,y position before setting the current position.
          lx=x;
          ly=y;



        x = (evt.clientX - rect.left) - canvas.offsetLeft;
        y = (evt.clientY - rect.top) - canvas.offsetTop;
      },
  
      //Write the x,y coods to the target div
      writeXY: function() {
        document.getElementById('trackX').innerHTML = 'X: ' + x;
        document.getElementById('trackY').innerHTML = 'Y: ' + y;
      },

      setStart: function() {
        x1=x;
        y1=y;
      },
      
      setEnd: function() {
        x2=x;
        y2=y;
      },

      //Sets the shape to be drawn
setShape: function(shp) {
    shape = shp;
  },

  getShape: function() {
    return shape;
  },

  setColor: function(colr){
    color = colr;
  },

  setIsDrawing: function(bool) {
    isDrawing = bool;
  },
  
  getIsDrawing: function() {
    return isDrawing;
  },
 //Draws the selected shape
 draw: function() {
    ctx.restore();
    if(shape==='rectangle')
    {
      this.drawRect();
    } else if( shape==='line' ) {
      this.drawLine();
    } else if( shape==='circle' ) {
      this.drawCircle();
    } else if( shape==='path'){
      this.drawPath();
    }
    else {
      alert('Please choose a shape');
    }
    ctx.save();
  },
  drawPath: function() {
    //Start by using random fill colors.
    ctx.strokeStyle = color
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(x, y);
    ctx.stroke();
  },

//Draw a circle
drawCircle: function() {

    ctx.strokeStyle = color
    ctx.fillStyle = color
  
    let a = (x1-x2)
    let b = (y1-y2)
    let radius = Math.sqrt( a*a + b*b );
  
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
  },
  //Draw a line
drawLine: function() {
    //Start by using random fill colors.
    ctx.strokeStyle = color
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  },
  
      drawRect: function(x,y,h,w) {

        //Start by using random fill colors.
        ctx.fillStyle = color
      
        ctx.fillRect (x1,y1,(x2-x1),(y2-y1));
      
      },
  
      getCanvas: function(){
        return canvas;
      },
  
      //Initialize the object, this must be called before anything else
      init: function() {
        canvas.width = mWidth;
        canvas.height = mHeight;
        document.querySelector('main').appendChild(canvas);
  
      }
    };
  
  })();
  
  //Initialize draw
  draw.init();
  
  draw.getCanvas().addEventListener('mousemove', function(evt) {
    draw.setXY(evt);
    draw.writeXY();
    if(draw.getShape()=='path' && draw.getIsDrawing()===true) {
      draw.draw();
    }
  }, false);



//Set the starting position
draw.getCanvas().addEventListener('mousedown', function() {
    draw.setStart();
    draw.setIsDrawing(true);
  }, false);

  draw.getCanvas().addEventListener('mouseup', function() {
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);
  }, false);



  document.getElementById('btnRect').addEventListener('click',function(){
    draw.setShape('rectangle');
}, false);

document.getElementById('btnLine').addEventListener('click',function(){
    draw.setShape('line');
}, false);

document.getElementById('btnCircle').addEventListener('click', function(){
    draw.setShape('circle');
}, false);
document.getElementById('btnPath').addEventListener('click', function(){
    draw.setShape('path');
}, false);

document.getElementById('btnRed').addEventListener('click', function(){
  draw.setColor('#ff0000');
}, false);

document.getElementById('btnBlack').addEventListener('click', function(){
  draw.setColor('#000000');
}, false);

document.getElementById('btnGreen').addEventListener('click', function(){
  draw.setColor('#00ff00');
}, false);

document.getElementById('btnBlue').addEventListener('click', function(){
  draw.setColor('#0000ff');
}, false);


