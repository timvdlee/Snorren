import {variantMapper,roleMapper,playerCountMap } from './data.js';
document.addEventListener("DOMContentLoaded", function() {
    onThemaPlayerCountChange(); // Call the function once on page load to set the initial state
    const themaSelector = document.getElementById("themaSelect");

    const playerNumberSelector = document.getElementById("aantalSpelersSelect");

    const startButton = document.getElementById("startSpelButton");
    
    themaSelector.addEventListener("change", onThemaPlayerCountChange);
    playerNumberSelector.addEventListener("change", onThemaPlayerCountChange);

    startButton.addEventListener("click", startSpel);



})


function startSpel() {
    localStorage.setItem("gameData", JSON.stringify(onThemaPlayerCountChange())); // Store the latest roles in localStorage
    location.href = "nacht1/";
    // Pass through variables to new page

}




function onThemaPlayerCountChange() {
    console.log("Thema or player count changed");
    const themaSelector = document.getElementById("themaSelect");
    const playerNumberSelector = document.getElementById("aantalSpelersSelect");
    const selectedThema = themaSelector.value;
    const themaIndex = variantMapper[selectedThema];
    const selectedPlayerCount = parseInt(playerNumberSelector.value);

    console.log("Selected Thema:", selectedThema, "Index:", themaIndex);
    console.log("Selected Player Count:", selectedPlayerCount);

    const rawRoles = playerCountMap[selectedPlayerCount];
    console.log("Raw Roles:", rawRoles);
    const mappedRoles = rawRoles.map(roleKey => roleMapper[roleKey][themaIndex]);
    console.log("Mapped Roles:", mappedRoles);

    const roleListElement = document.getElementById("roleList"); 
    roleListElement.innerHTML = ""; // Clear the list

    const countedRoles = rawRoles.reduce((acc, role) => {
        acc[role] = (acc[role] || 0) + 1;
        return acc;
        }, {});

    // Dispaly the counted roles in the list
    for (const [role, count] of Object.entries(countedRoles)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${roleMapper[role][themaIndex]} (${count}x)`;
        roleListElement.appendChild(listItem);
    }


    return {
        "thema": selectedThema,
        "playerCount": selectedPlayerCount,
        "roles": countedRoles

    }; // Return the counted roles for further use if needed

}