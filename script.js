const textInput = document.getElementById("player-name-input");
const addPlayerBtn = document.getElementById("add-player");
const rmvPlayerBtn = document.getElementById("remove-player");
const playerList = document.querySelector(".player-list ul");

addPlayerBtn.addEventListener("click", addPlayer);
rmvPlayerBtn.addEventListener("click", rmvPlayer);

startGameBtn.addEventListener("click", () => {
    // if (activePlayerList.length < 2) {
    //     alert("At least 2 players are required to start the game.");
    //     return;
    // }
    document.getElementById("start-screen").className = "screen";
    document.getElementById("game-screen").className = "screen active";
    startGame();
});

let activePlayerList = [];
let locations = [
    "Hospital", "School", "Beach", "Restaurant", "Airport", "Bank", "Supermarket", "Cinema", "Train Station", "Hotel",
    "Museum", "Library", "Park", "Factory", "Police Station", "Fire Station", "University", "Shopping Mall", "Stadium", "Cruise Ship"
];

let roles = {
    "Hospital": [
        "Doctor", "Nurse", "Patient", "Surgeon", "Receptionist", "Janitor", "Pharmacist", "Therapist", "Radiologist", "Security Guard",
        "Paramedic", "Visitor", "Lab Technician", "Administrator", "Volunteer"
    ],
    "School": [
        "Teacher", "Student", "Principal", "Janitor", "Counselor", "Librarian", "Coach", "Secretary", "Security Guard", "Cafeteria Worker",
        "Substitute", "Parent", "Bus Driver", "Nurse", "Maintenance Worker"
    ],
    "Beach": [
        "Lifeguard", "Swimmer", "Surfer", "Vendor", "Tourist", "Photographer", "Child", "Parent", "Fisherman", "Sandcastle Builder",
        "Jogger", "Diver", "Boat Captain", "Beach Patrol", "Ice Cream Seller"
    ],
    "Restaurant": [
        "Chef", "Waiter", "Manager", "Customer", "Host", "Bartender", "Dishwasher", "Sous Chef", "Busser", "Sommelier",
        "Cashier", "Cook", "Delivery Person", "Food Critic", "Janitor"
    ],
    "Airport": [
        "Pilot", "Flight Attendant", "Passenger", "Security Officer", "Customs Agent", "Baggage Handler", "Ticket Agent", "Janitor", "Mechanic", "Shopkeeper",
        "Taxi Driver", "Air Traffic Controller", "Tourist", "Business Traveler", "Child"
    ],
    "Bank": [
        "Teller", "Manager", "Customer", "Security Guard", "Loan Officer", "Janitor", "Accountant", "Robber", "Investor", "Receptionist",
        "Auditor", "Consultant", "ATM Technician", "Cleaner", "Guard"
    ],
    "Supermarket": [
        "Cashier", "Shopper", "Manager", "Stock Clerk", "Security Guard", "Janitor", "Butcher", "Baker", "Produce Worker", "Customer Service",
        "Delivery Driver", "Child", "Parent", "Pharmacist", "Cleaner"
    ],
    "Cinema": [
        "Ticket Seller", "Projectionist", "Usher", "Customer", "Manager", "Janitor", "Snack Seller", "Security Guard", "Child", "Parent",
        "Film Critic", "Actor", "Director", "Cashier", "Cleaner"
    ],
    "Train Station": [
        "Conductor", "Passenger", "Ticket Seller", "Security Guard", "Janitor", "Shopkeeper", "Train Driver", "Tourist", "Child", "Parent",
        "Porter", "Maintenance Worker", "Busker", "Cleaner", "Guard"
    ],
    "Hotel": [
        "Receptionist", "Guest", "Manager", "Housekeeper", "Bellhop", "Concierge", "Chef", "Waiter", "Security Guard", "Janitor",
        "Tourist", "Business Traveler", "Child", "Parent", "Cleaner"
    ],
    "Museum": [
        "Curator", "Visitor", "Security Guard", "Guide", "Janitor", "Artist", "Historian", "Child", "Parent", "Receptionist",
        "Shopkeeper", "Teacher", "Student", "Cleaner", "Guard"
    ],
    "Library": [
        "Librarian", "Reader", "Student", "Teacher", "Janitor", "Security Guard", "Child", "Parent", "Receptionist", "Researcher",
        "Author", "Volunteer", "Cleaner", "Guard", "Technician"
    ],
    "Park": [
        "Jogger", "Dog Walker", "Child", "Parent", "Gardener", "Picnicker", "Cyclist", "Photographer", "Vendor", "Security Guard",
        "Janitor", "Tourist", "Birdwatcher", "Cleaner", "Guard"
    ],
    "Factory": [
        "Worker", "Manager", "Engineer", "Janitor", "Security Guard", "Technician", "Supervisor", "Inspector", "Delivery Driver", "Cleaner",
        "Receptionist", "Accountant", "Machinist", "Guard", "Maintenance Worker"
    ],
    "Police Station": [
        "Police Officer", "Detective", "Receptionist", "Janitor", "Security Guard", "Suspect", "Victim", "Lawyer", "Chief", "Dispatcher",
        "Cleaner", "Guard", "Investigator", "Witness", "Technician"
    ],
    "Fire Station": [
        "Firefighter", "Chief", "Receptionist", "Janitor", "Security Guard", "Paramedic", "Driver", "Mechanic", "Cleaner", "Guard",
        "Dispatcher", "Trainer", "Volunteer", "Inspector", "Cook"
    ],
    "University": [
        "Professor", "Student", "Dean", "Janitor", "Security Guard", "Researcher", "Lecturer", "Receptionist", "Technician", "Cleaner",
        "Parent", "Visitor", "Guard", "Librarian", "Coach"
    ],
    "Shopping Mall": [
        "Shopkeeper", "Customer", "Security Guard", "Janitor", "Manager", "Cashier", "Child", "Parent", "Cleaner", "Guard",
        "Delivery Driver", "Food Court Worker", "Tourist", "Maintenance Worker", "Receptionist"
    ],
    "Stadium": [
        "Player", "Coach", "Fan", "Security Guard", "Janitor", "Referee", "Vendor", "Announcer", "Child", "Parent",
        "Cleaner", "Guard", "Photographer", "Medic", "Ticket Seller"
    ],
    "Cruise Ship": [
        "Captain", "Passenger", "Chef", "Waiter", "Housekeeper", "Security Guard", "Janitor", "Tourist", "Child", "Parent",
        "Entertainer", "Bartender", "Cleaner", "Guard", "Receptionist"
    ]
}

function addPlayer(){
    const name = textInput.value.trim();
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
    if (activePlayerList.length === 0) {
        alert("No players to remove.");
        return;
    }
    playerList.removeChild(playerList.lastElementChild)
    activePlayerList.pop();
}

function startGame() {
    const gameScreen = document.getElementById("game-screen");
    
    // Remove any existing player buttons
    gameScreen.innerHTML = '';

    let randomLocationIndex = Math.floor(Math.random() * locations.length);
    let gameLocation = locations[randomLocationIndex];
    let locationRoles = roles[gameLocation];
    let spyIndex = Math.floor(Math.random() * activePlayerList.length);
    
    // Add a button for each player
    activePlayerList.forEach((player, idx) => {
        const btn = document.createElement("button");
        btn.className = "player-btn";
        
        btn.textContent = player;
        btn.id = `player-btn-${idx}`;
        let playerRole;
        if (idx === spyIndex) {
            playerRole = "Spy";
        }
        else{
            let roleIndex = Math.floor(Math.random() * locationRoles.length);  
            playerRole = locationRoles[roleIndex];
            locationRoles.splice(roleIndex, 1); // Remove assigned role to avoid duplicates
        }

        btn.addEventListener("click", (event) => {
            openPlayerInfo(gameLocation, playerRole, event);
        });

        gameScreen.appendChild(btn);
    });
}

function openPlayerInfo(location, role, event) {
    const gameLocationElement = document.getElementById("game-location");
    if (role !== "Spy"){
        gameLocationElement.textContent = location;
    } else {
        gameLocationElement.textContent = "?????";
    }

    const playerRoleElement = document.getElementById("player-role");
    playerRoleElement.textContent = role;

    event.target.style.backgroundColor = 'rgb(224, 253, 243)';
    const playerInfoModal = document.getElementById("player-info-modal");
    const modalOverlay = document.getElementById("modal-overlay");
    playerInfoModal.classList.add("active");
    modalOverlay.classList.add("active");
    const closeModalBtn = document.querySelector("#player-info-modal .close-modal");
    closeModalBtn.onclick = () => {
        playerInfoModal.classList.remove("active");
        modalOverlay.classList.remove("active");
    };
    const playerNameText = document.getElementById("player-name-text");
    playerNameText.textContent = event.target.textContent;
    //set location and role
}