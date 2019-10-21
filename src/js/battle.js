var attackIcon = document.getElementById("attackimg");
var blockIcon = document.getElementById("blockimg");
var grabIcon = document.getElementById("grabimg");


var animation = null;

//position of icons
var yourx = 50;
var enemyx = 175;

//controls speed of moving icons
var iconSpeed = 5;

var battlesim = (function(){

    //reserved for canvas
    var battlecanvas = document.getElementById("Arena");
    var ctx = battlecanvas.getContext("2d");

    var yourchoice = 0;
    var enemychoice = 0;

    var youricon = null;
    var enemyicon = null;

    var yourHP = 20;
    var enemyHP = 20;
    
    var turns = 0;
    var playerhistory = [0];
    var enemyhistory = [0];

    var lastpair = null;
    
    var pairindex1 = 0;
    var pairindex2 = 0;
    
    //used to ensure sum of probabilities for all future inputs are equal to 1
    var denominator = 0;

    //affects the "memory" of the Markov Chain
    var decay = 0.9;

    //variables to store the option with the max and min probabilities
    var maxprob = 0;
    var minprob = 0;

    //variable to store the predicted input
    var prediction = 0;

    //Multidimensional Array concept from here: https://www.javascripttutorial.net/javascript-multidimensional-array/

    var markovMatrix = [[11],[12],[13],[21],[22],[23],[31],[32],[33]];
    var occurrence = [[11],[12],[13],[21],[22],[23],[31],[32],[33]];

    //game over condition
    var gameOver = false;

    return{
        setChoice: function(){
            if(document.getElementById("Attack").checked == true){
                yourchoice = 1;
            }
            else if(document.getElementById("Block").checked == true){
                yourchoice = 2;
            }
            else if(document.getElementById("Grab").checked == true){
                yourchoice = 3;
            }
            else{
                window.alert("Pick an option!");
            }
        },

        computerChoice: function(){
        if(turns <= 0){
            enemychoice = Math.floor(Math.random()*3 + 1);
        }
        else if(turns == 1){
            switch(playerhistory[1]){
                    case 1:
                        enemychoice = 2;
                        break;
                    case 2:
                        enemychoice = 3;
                        break;
                    case 3:
                        enemychoice = 1;
                        break;
                    default:
                        enemychoice = Math.floor(Math.random()*3 + 1);
                }
            
        }
        else
        {
        pairindex2 = pairindex1;
        lastpair = Number(playerhistory[turns - 1].toString() + enemyhistory[turns - 1].toString());

        switch(lastpair){
            case 11:
                pairindex1 = 0;
                break;
            case 12:
                pairindex1 = 1;
                break;
            case 13:
                pairindex1 = 2;
                break;
            case 21:
                pairindex1 = 3;
                break;
            case 22:
                pairindex1 = 4;
                break;
            case 23:
                pairindex1 = 5;
                break;
            case 31:
                pairindex1 = 6;
                break;
            case 32:
                pairindex1 = 7;
                break;
            case 33:
                pairindex1 = 8;
                break;
            default:
                document.getElementById("result").innerText = "Oops. Something went wrong....";
        }
        
        this.markovChain(pairindex2);    
        this.predict(pairindex1);
        switch(prediction){
                    case 1:
                        enemychoice = 2;
                        break;
                    case 2:
                        enemychoice = 3;
                        break;
                    case 3:
                        enemychoice = 1;
                        break;
                    default:
                        enemychoice = Math.floor(Math.random()*3 + 1);
                }
        
            
        }
        },

    fillHistory: function(){
        playerhistory.push(yourchoice);
        enemyhistory.push(enemychoice);
    },

        matchUp: function(){
        switch(yourchoice){
            
            //You attack.
            case 1:
            if(enemychoice == 1){
                document.getElementById("result").innerText = "The enemy and you both attack. As a result, both of you suffer damage.";

                yourHP = yourHP - 1;
                enemyHP = enemyHP - 1;

            }else if(enemychoice == 2){
                document.getElementById("result").innerText = "The enemy blocks your attack and sustains no damage.";

            }else if(enemychoice == 3){
                document.getElementById("result").innerText = "Crtical hit! You attack the grabbing enemy!";

                enemyHP = enemyHP - 2;
            }else{
                document.getElementById("result").innerText = "Oops. Something went wrong....";
            }
            break;
            
            //You block.
            case 2:
            if(enemychoice == 1){
                document.getElementById("result").innerText = "You block the enemy's attack and sustain no damage!";

            }else if(enemychoice == 2){
                document.getElementById("result").innerText = "You and the enemy both block. Nothing happens.";

            }else if(enemychoice == 3){
                document.getElementById("result").innerText = "Ouch! The enemy grabbed and threw you while you tried to block!";

                yourHP = yourHP - 2;
                
            }else{
                document.getElementById("result").innerText = "Oops. Something went wrong....";
            }
            break;

            
            //You grab.
            case 3:
            if(enemychoice == 1){
                document.getElementById("result").innerText = "Ouch! You tried to grab the enemy, but they attacked you instead!";

                yourHP = yourHP - 2;

            }else if(enemychoice == 2){
                document.getElementById("result").innerText = "Yes! You grabbed and threw the enemy as they were blocking!";

                enemyHP = enemyHP - 2;

            }else if(enemychoice == 3){
                document.getElementById("result").innerText = "You tried to grab the enemy as they tried to grab you. Damage nullfied.";

            }else{
                document.getElementById("result").innerText = "Oops. Something went wrong....";
            }
            break;

            //Miscellany.
            default:
                document.getElementById("result").innerText = "Oops. Something went wrong....";
        }
        if(yourchoice != 0){
        turns = turns + 1;
        }
            
        },

    showHP: function(){
        document.getElementById("hp1").innerText = "Your HP: " + yourHP;
        document.getElementById("hp2").innerText = "Enemy HP: " + enemyHP;
        document.getElementById("turnnumber").innerText = "Turn: " + turns;

        //Following are used for debugging purposes

        if(turns < 10){
        
            document.getElementById("arraytest").innerText = "Array Test: " + playerhistory.length + " Your History: " + playerhistory.toString();
        
            document.getElementById("enemytest").innerText = "Array Test: " + enemyhistory.length + " Enemy History: " + enemyhistory.toString();
        }
        else{
            document.getElementById("arraytest").innerText = "Array Test: " + playerhistory.length + " Your History: " + playerhistory.slice(turns - 10).toString();
        
            document.getElementById("enemytest").innerText = "Array Test: " + enemyhistory.length + " Enemy History: " + enemyhistory.slice(turns - 10).toString();
        
        }

        /*
        for(var m = 0; m < 9; m++){
            for(var n = 0; n < 4; n++){
                
                document.getElementById(m.toString() + n.toString()).innerHTML = markovMatrix[m][n].toPrecision(2) + " " + occurrence[m][n].toPrecision(2);
            }
        }
        */
        
    },

    //stores the Markov Matrix in local storage
    storeMatrix: function(){

        for(var m = 0; m < 9; m++){
            for(var n = 0; n < 4; n++){
                
                window.localStorage.setItem(m.toString() + n.toString(),markovMatrix[m][n].toPrecision(2) + " " + occurrence[m][n].toPrecision(2));
            }
        }
        

    },

    //advanced enemy decision making algorithm
    // Source website: https://towardsdatascience.com/how-to-win-over-70-matches-in-rock-paper-scissors-3e17e67e0dab

    initializeMatrix: function(){
        for(var i = 0; i < 9; i++){
            for(var j = 1; j < 4; j++){
                markovMatrix[i].push(1/3);
                occurrence[i].push(0);
            }
        }

    },

    markovChain: function(pairindex){

        for(var j = 1; j < 4; j++){
            occurrence[pairindex][j] = decay*occurrence[pairindex][j];
        }
        occurrence[pairindex][playerhistory[turns - 1]] = occurrence[pairindex][playerhistory[turns - 1]] + 1;

        denominator = 0;

        for(j = 1; j < 4; j++){
            denominator = denominator + occurrence[pairindex][j];
        }
        for(j = 1; j < 4; j++){
            markovMatrix[pairindex][j] = occurrence[pairindex][j]/denominator;
        }
        

    },
    
    predict: function(pairindex){

            for(var i = 1; i < 4; i++){
                maxprob = Math.max(markovMatrix[pairindex][i], maxprob);
                minprob = Math.min(markovMatrix[pairindex][i], minprob);
            }
            if(maxprob == minprob){
                prediction = Math.floor(Math.random()*3 + 1);
            }
            else
            {
                
                switch(markovMatrix[pairindex].indexOf(maxprob)){
                    case 1:
                        prediction = 1;
                        break;
                    case 2:
                        prediction = 2;
                        break;
                    case 3:
                        prediction = 3;
                        break;
                    default:
                        document.getElementById("result").innerText = "Oops. Something went wrong....";
                }
            }

        //return prediction;
    },
    
    winCondition: function(){
        if(yourHP > 0 && enemyHP <= 0){
            document.getElementById("result").innerText = "Yes! You knocked out the enemy! You win!";
            document.getElementById("battleBtn").value = "Restart!";
            gameOver = true;
        }
        else if(yourHP <= 0 && enemyHP > 0){
            document.getElementById("result").innerText = "No! You were knocked out by the enemy! You lose!";
            document.getElementById("battleBtn").value = "Restart!";
            gameOver = true;
        }
        else if(yourHP <= 0 && enemyHP <= 0){
            document.getElementById("result").innerText = "You and the enemy both knocked each other out. Draw.";
            document.getElementById("battleBtn").value = "Restart!";
            gameOver = true;
        }
        else{
            gameOver = false;
        }
        return gameOver;
    },

    battleGraphics: function(){

        ctx.clearRect(yourx, 50, 50, 50);
        ctx.clearRect(enemyx, 50, 50, 50);

        switch(yourchoice){
            case 1:
                youricon = attackIcon;
                break;
            case 2:
                youricon = blockIcon;
                break;
            case 3:
                youricon = grabIcon;
                break;
            default:
                document.getElementById("result").innerText = "Oops. Something went wrong....";
        }
        ctx.drawImage(youricon, yourx, 50, 50, 50);
        
        switch(enemychoice){
            case 1:
                enemyicon = attackIcon;
                break;
            case 2:
                enemyicon = blockIcon;
                break;
            case 3:
                enemyicon = grabIcon;
                break;
            default:
                document.getElementById("result").innerText = "Oops. Something went wrong....";
        }
        ctx.drawImage(enemyicon, enemyx, 50, 50, 50);

        animation = window.requestAnimationFrame(this.battleGraphics.bind(this));
    },
    
    initialize: function(){

        yourchoice = 0;
        enemychoice = 0;

        yourHP = 20;
        enemyHP = 20;
    
    turns = 0;
    playerhistory = [0];
    enemyhistory = [0];

    lastpair = null;
    pairindex1 = 0;
    pairindex2 = 0;

    prediction = 0;
    
    
    //used to ensure sum of probabilities for all future inputs are equal to 1
    denominator = 0;

    //affects the "memory" of the Markov Chain
    decay = 0.9;

    //variables to store the option with the max and min probabilities
    maxprob = 0;
    minprob = 0;

    //Multidimensional Array concept from here: https://www.javascripttutorial.net/javascript-multidimensional-array/

    markovMatrix = [[11],[12],[13],[21],[22],[23],[31],[32],[33]];
    occurrence = [[11],[12],[13],[21],[22],[23],[31],[32],[33]];

    gameOver = false;
        
    },
    
    
    }

})();

battlesim.initialize();
battlesim.initializeMatrix();
battlesim.showHP();
battlesim.storeMatrix();


document.getElementById("battleBtn").addEventListener("click",function(){
if(battlesim.winCondition() == false)
{
    document.getElementById("battleBtn").value = "Battle!";
    battlesim.setChoice();
    battlesim.computerChoice();
    battlesim.battleGraphics();
    battlesim.matchUp();
    battlesim.fillHistory();
    //battlesim.markovChain();
    battlesim.showHP();
    battlesim.storeMatrix();
    battlesim.winCondition();
}
else
{
    document.getElementById("battleBtn").value = "Battle!";
    battlesim.initialize();
    battlesim.initializeMatrix();
    battlesim.showHP();
    battlesim.storeMatrix();
}
});