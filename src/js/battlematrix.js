for(var m = 0; m < 9; m++){
    for(var n = 0; n < 4; n++){
        
        document.getElementById(m.toString() + n.toString()).innerHTML = window.localStorage.getItem(m.toString() + n.toString());
    }
}