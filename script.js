const textInput = document.getElementById("player-name-input");
const addPlayerBtn = document.getElementById("add-player");
const rmvPlayerBtn = document.getElementById("remove-player");
const playerList = document.querySelector(".player-list ul");

addPlayerBtn.addEventListener("click", addPlayer);
rmvPlayerBtn.addEventListener("click", rmvPlayer);

activePlayerList = [];

function addPlayer(){
    const name = textInput.value.trim();
    console.log(name);
    if (name === '') {
        alert("Please enter a player name.");
        textInput.focus();
        return;
    }

    const newPlayer = document.createElement("li");
    newPlayer.textContent = name;
    playerList.appendChild(newPlayer);
    activePlayerList.append(name);

    textInput.value = '';
}

function rmvPlayer(){
    playerList.removeChild(playerList.lastElementChild)
    activePlayerList.pop();
}
