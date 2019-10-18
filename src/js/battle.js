var battlesim = (function(){

    //reserved for canvas
    var battlecanvas = null;
    var ctx = null;

    var yourchoice = 0;
    var enemychoice = 0;

    var yourHP = 20;
    var enemyHP = 20;

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
            enemychoice = Math.floor(Math.random()*3 + 1);
        },

        matchUp: function(){
            
        },
    }

})();
document.getElementById("battleBtn").addEventListener("click",function(){
battlesim.setChoice();
});