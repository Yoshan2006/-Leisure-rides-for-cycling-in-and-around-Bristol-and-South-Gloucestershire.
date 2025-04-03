// author: Mihiranga

// globals
let rightSidebarOpen = false;

function transitionRightSidebar(direction) {
    let rightSidebar = document.getElementById("right");

    if (direction === "open") {
        rightSidebarOpen = true;
        rightSidebar.style = `animation: right-sidebar-open 0.25s ease-in-out;
        animation-fill-mode: forwards;`;
    } else if (direction === "close") {
        rightSidebarOpen = false;
        rightSidebar.style = `animation: right-sidebar-close 0.25s ease-in-out;
        animation-fill-mode: forwards;`;

        document.getElementById("right-name-desc").innerHTML = "";
        document.getElementById("right-info").innerHTML = "";
    }
}


/* info is an object containing the following attributes
    - distance -> distance
    - estimated minimum time -> minTime
    - estimated maximum time -> maxTime
    - difficulty -> difficulty
    - difficulty color code -> color
*/
function updateRightSidebar(info) {
    // set name and description dynamically
    let nameDiv = document.getElementById("right-name-desc");

    let name = document.createElement("p");
    let desc = document.createElement("p");

    name.innerHTML = `${info.name}`;
    desc.innerHTML = `${info.description}`;
    desc.style = "font-size: 1rem; width: 80%;";

    nameDiv.appendChild(name);
    nameDiv.appendChild(desc);

    // set route distance and ETA dynamically
    let infoDiv = document.getElementById("right-info");

    let distance = document.createElement("p");
    let ETA = document.createElement("p");

    distance.style = "font-size: 1rem;";
    ETA.style = "font-size: 1rem;";

    distance.innerHTML = `Distance: ${info.distance}km`;
    if (info.minTime === info.maxTime) {
        ETA.innerHTML = `Estimated time: ${info.minTime} mins`;
    } else {
        ETA.innerHTML = `Estimated time:
        ${info.minTime} - ${info.maxTime} mins`;
    }

    infoDiv.appendChild(distance);
    infoDiv.appendChild(ETA);

    // set route difficulty and color code dynamically
    let difficultySpan = document.createElement("span");
    let difficulty = document.createElement("p");
    let colorCode = document.createElement("div");

    difficulty.style = "font-size: 1rem;";
    difficulty.innerHTML = `Difficulty: ${info.difficulty}`;
    colorCode.style = `width: 30px; height: 30px; border-radius: 10px;
    background: #${info.color}`;

    difficultySpan.appendChild(difficulty);
    difficultySpan.appendChild(colorCode);
    infoDiv.appendChild(difficultySpan);
}
