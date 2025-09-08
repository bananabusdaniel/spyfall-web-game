const textInput = document.getElementById("player-name-input");
const addPlayerBtn = document.getElementById("add-player");
const rmvPlayerBtn = document.getElementById("remove-player");

addPlayerBtn.addEventListener("click", addPlayer);
rmvPlayerBtn.addEventListener("click", rmvPlayer);

function addPlayer(){
    if(textInput.value = ''){
        throw new Error("Input name in text field.")
    }else{
        
    }
}