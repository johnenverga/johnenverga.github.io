//import { Point } from "paper";

//import { Path, Rectangle } from "paper";

var myRectangle = new Rectangle(new Point(50,50), new Size(50,50));

var myPath = new Path.Rectangle(myRectangle).rotate(45);

myPath.strokeColor = 'red';