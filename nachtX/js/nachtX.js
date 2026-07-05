import {variantMapper,roleMapper,playerCountMap,nachtxVolgorde,roleGroups,nightTooltip} from '../../js/data.js';

let isKnopGeklikt = false;

document.addEventListener("DOMContentLoaded", function() {
    populatePlayers();
    const endNacht1Button = document.getElementById("endNacht1Button");
    const spelerToRoleMap = JSON.parse(localStorage.getItem("rollenVanSpelers"));
    if (!spelerToRoleMap) {
        console.error("No player-role mapping found in localStorage. Redirecting to main page.");
        location.href = window.location.origin + "/Snorren/";
    }


        // Zoek alle knoppen met de klasse 'btn-toggle-status'
    const buttons = document.querySelectorAll('.playerToggle');

    // Geef elke knop een klik-functie
    buttons.forEach(button => {
        button.addEventListener('click', togglePlayerAliveStatus);
    });


    translateTranslatableTargerts();
    populateNight();
    insertPlayerStatusButtons();
    
});

window.addEventListener("beforeunload", savePlayerStatus);


function getPlayerToRoleMap() {
    const rolePlayerMap = JSON.parse(localStorage.getItem("rollenVanSpelers"));
    let spelerToRoleMap = {};
    let spelers = []
    let geliefden = []
    for (let roleKey in rolePlayerMap) {
        roleKey = roleKey.trim();
        if (roleKey.startsWith("_geliefde")) {
            geliefden.push(rolePlayerMap[roleKey]);
        } else {
        const playerName = rolePlayerMap[roleKey];
        spelers.push(playerName);
        spelerToRoleMap[playerName] = roleKey;
        }
    }
    spelers.sort((a, b) => a.localeCompare(b));
    console.log("Player to Role Map:", spelerToRoleMap);
    console.log("Geliefden:", geliefden);
    console.log("Spelers:", spelers);
    
    return [spelerToRoleMap, spelers, geliefden];
}

function insertPlayerStatusButtons() {
    const spelersContainer = document.getElementById("spelersContainer");
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    const gameVariantIndex = variantMapper[gameData.thema];
    const playerStatusTemplate = document.getElementById("playerStatusTemplate");
    const combiMap = getPlayerToRoleMap();
    const spelerToRoleMap = combiMap[0];
    const spelers = combiMap[1];
    const geliefden = combiMap[2];

    const playerAliveStatus = JSON.parse(localStorage.getItem("playerAliveStatus")) || {};

    spelers.forEach(playerName => {
        let uniqueRoleKey = spelerToRoleMap[playerName];
        const roleKey = uniqueRoleKey.split("-")[0]; // Extract the base role key
        const roleName = roleMapper[roleKey][gameVariantIndex];

        const playerButtonClone = playerStatusTemplate.content.cloneNode(true);
        const playerButton = playerButtonClone.querySelector("#playerStatus");
        playerButton.textContent = `${playerName} (${roleName})`;
        if (geliefden.includes(playerName)) {
            playerButton.textContent += " ❤︎"; // Add a heart symbol for lovers
        }


        playerButton.setAttribute("alive", "true");
        playerButton.setAttribute("name", playerName);
        playerButton.setAttribute("role", uniqueRoleKey);
        playerButton.addEventListener('click', togglePlayerAliveStatus);
        if (playerAliveStatus[playerName] !== undefined) {
            if (playerAliveStatus[playerName] === false) {
                playerButton.click(); // Simulate a click to set the button to "dead" state
            }
        }
        spelersContainer.appendChild(playerButton);
    
        // Implementation for inserting player status buttons
    });

}

function savePlayerStatus() {
    const buttons = document.querySelectorAll('#playerStatus');
    let aliveStatusMap = {};
    buttons.forEach(button => {
        const playerName = button.getAttribute("name");
        const isAlive = button.getAttribute("alive") === "true";
        aliveStatusMap[playerName] = isAlive;
    });
    localStorage.setItem("playerAliveStatus", JSON.stringify(aliveStatusMap));
    console.log("Saved player alive status:", aliveStatusMap);
}

function togglePlayerAliveStatus(event) {
    const button = event.currentTarget;
            if (button.getAttribute("alive") == "true") {
                button.setAttribute("alive", "false");
                button.classList.remove("btn-light");
                button.classList.add("btn-outline-light");
            } else if (button.getAttribute("alive") == "false") {
                button.setAttribute("alive", "true");
                button.classList.remove("btn-outline-light");
                button.classList.add("btn-light");
            }
            button.blur()
        }


function getPlayerName(roleKey) {
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    const rollenVanSpelers = JSON.parse(localStorage.getItem("rollenVanSpelers"));
        const playerName = rollenVanSpelers[`${roleKey}-1`];
        return playerName;
    } 


function getPlayerGroupNames(groupName) {
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    let themaVariant = variantMapper[gameData.thema];
    const spelerToRoleMap = JSON.parse(localStorage.getItem("rollenVanSpelers"));
    if (groupName == "_snorren") {
        let finalString = `${roleMapper["_alphaSnor"][themaVariant]}: ${spelerToRoleMap["_alphaSnor-1"]}  `
        const manMetPlakSnorCount = gameData["roles"]["_manMetPlakSnor"];
        if (manMetPlakSnorCount > 0) {
            finalString += `, ${roleMapper["_manMetPlakSnor"][themaVariant]}: ${spelerToRoleMap["_manMetPlakSnor-1"]}  `
        }

        const snorCount = gameData["roles"]["_snor"];
        for (let i = 1; i <= snorCount; i++) {
            finalString += `, ${roleMapper["_snor"][themaVariant]} ${i}: ${spelerToRoleMap[`_snor-${i}`]} `
        }

        return finalString
    }

}

function populateNight() {
    const nightContainer = document.getElementById("nachtContainer");
    const nightTemplate = document.getElementById("roleNameTemplate");
    for (const roleKey of nachtxVolgorde) {
        let nightRoleClone = nightTemplate.content.cloneNode(true);
        const roleNameElement = nightRoleClone.querySelector("#roleName");
        const roleTooltipElement = nightRoleClone.querySelector("#roleTooltip");
        let roleName = roleMapper[roleKey][variantMapper[JSON.parse(localStorage.getItem("gameData")).thema]];
        const multiRoleField = nightRoleClone.querySelector("#multipleRoleField");
        if (roleKey in roleGroups) {
            roleNameElement.textContent = roleName
            multiRoleField.hidden = false;
            multiRoleField.textContent = getPlayerGroupNames(roleKey);
        } else {
            roleNameElement.textContent = roleName;
            multiRoleField.hidden = false;
            multiRoleField.textContent = `${roleName}: ${getPlayerName(roleKey)}`;
        }
        roleTooltipElement.textContent = translateToolTip(nightTooltip[roleKey]);
        nightContainer.appendChild(nightRoleClone);
    
    
    }


}


function translateTranslatableTargerts() {
    const translatableElements = document.querySelectorAll('.translationTarget');
    translatableElements.forEach(element => {
        element.textContent = translateToolTip(element.textContent);
    });
}


function translateToolTip(toolTipToTranslate) {
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    // Find the variable marked in the string with ${} and replace it with the corresponding role name
    const regex = /\$\{(.*?)\}/g;
    const translatedTooltip = toolTipToTranslate.replace(regex, (match, p1) => {
        return roleMapper[p1][variantMapper[gameData.thema]];
    });
    return translatedTooltip;
}

function populatePlayers() {
    const gameData = JSON.parse(localStorage.getItem("gameData"));


    const themaDisplay = document.getElementById("themaDisplay");
    const playerCountDisplay = document.getElementById("playerCountDisplay");

    themaDisplay.textContent = `Thema: ${gameData.thema}`;
    playerCountDisplay.textContent = `Aantal Spelers: ${gameData.playerCount}`;
}

