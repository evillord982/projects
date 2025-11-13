const duelists = ["Jett", "Iso", "Reyna", "Yoru", "Raze", "Neon", "Pheonix", "Waylay"];
const initiator = ["Sova", "Breach", "KAYO", "Skye", "Fade", "Tejo", "Gekko"];
const smokes = ["Clove", "Omen", "Astra", "Brimstone", "Viper", "Harbour"];
const sentinel = ["Cypher", "Chamber", "Sage", "Killjoy", "Vyse", "Veto"];

//combine arrays
//spread operator to combine all the agents
const allAgents = [...duelists, ...initiator, ...smokes, ...sentinel];

let selectedRole = 'allAgents'; // Default role is all roles, so choose out of all agents

// Buttons to choose roles
const duelistButton = document.getElementById('duelistButton');
const initiatorButton = document.getElementById('initiatorButton');
const smokesButton = document.getElementById('smokesButton');
const sentinelButton = document.getElementById('sentinelButton');

const randomButton = document.getElementById("agentButton");
const clearButton = document.getElementById("clearButton");
const agentDisplay = document.getElementById("agentDisplay");

duelistButton.addEventListener('click', () => selectedRole = 'duelist');
initiatorButton.addEventListener('click', () => selectedRole = 'initiator');
smokesButton.addEventListener('click', () => selectedRole = 'smokes');
sentinelButton.addEventListener('click', () => selectedRole = 'sentinel');

function randomAgent(){
    let selectedList;

    switch (selectedRole){
        case "duelist":
            selectedList = duelists;
            break;
        case "initiator":
            selectedList = initiator;
            break;
        case "smokes":
            selectedList = smokes;
            break;
        case "sentinel":
            selectedList = sentinel;
            break;
        default:
            selectedList = allAgents;

    }

    const index = Math.floor(Math.random() * selectedList.length);
    const agent = selectedList[index];
    agentDisplay.textContent = `Your agent is: ${agent}`;
    
}

randomButton.addEventListener('click', randomAgent);

//clear agent field
clearButton.addEventListener('click', function() {
    agentDisplay.textContent='Click to get agent';
});