import {variantMapper,roleMapper,playerCountMap,nacht0Volgorde,roleGroups,firstNightTooltip} from '../../js/data.js';
const preventReloadFlag = false

let isKnopGeklikt = false;

document.addEventListener("DOMContentLoaded", function() {
    populateRoleCounts();
    const endNacht1Button = document.getElementById("endNacht1Button");
    
    endNacht1Button.addEventListener("click", function() {
        isKnopGeklikt = true; // Zet de vlag op true vÓÓr het navigeren
        saveNacht1Data();
        location.href = window.location.origin + "/Snorren/nachtX/";
    });
});
if (preventReloadFlag) {
    window.onbeforeunload = function(e) {
        // Alleen waarschuwen als er NIET op de knop is geklikt
        if (!isKnopGeklikt) {

            return "Weet je zeker dat je deze pagina wilt verlaten? Je gegevens zullen verloren gaan.";
        }
    };
}


function translateToolTip(roleKey) {
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    // Find the variable marked in the string with ${} and replace it with the corresponding role name
    const tooltip = firstNightTooltip[roleKey];
    const regex = /\$\{(.*?)\}/g;
    const translatedTooltip = tooltip.replace(regex, (match, p1) => {
        return roleMapper[p1][variantMapper[gameData.thema]];
    });
    return translatedTooltip;
}



function saveNacht1Data() {
    const roleInputs = document.querySelectorAll("#roleInputField");
    const roleData = {};
    roleInputs.forEach(input => {
        const roleName = input.getAttribute("name");
        roleData[roleName] = input.value.trim();
    });
    console.log(roleData);
    localStorage.setItem("rollenVanSpelers", JSON.stringify(roleData));
}

function populateRoleCounts() {
    console.log("Nacht 1 page loaded");
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    if (!gameData) {
        console.error("No game data found in localStorage. Redirecting to main page.");
        location.href = window.location.origin + "/Snorren/";
    }
    console.log(gameData);

    const themaDisplay = document.getElementById("themaDisplay");
    const playerCountDisplay = document.getElementById("playerCountDisplay");

    themaDisplay.textContent = `Thema: ${gameData.thema}`;
    playerCountDisplay.textContent = `Aantal Spelers: ${gameData.playerCount}`;

    const roleInstructions = document.getElementById("roleInstructions");
    roleInstructions.innerHTML = `Laat deze spelers een voor een wakker worden. Tenzij ze <b>${roleMapper["_burger"][variantMapper[gameData.thema]]}</b> zijn. Laat ze dan hun hand opsteken!`;

    const nameFieldTemplate = document.getElementById("nameFieldTemplate");
    const roleFormTemplate = document.getElementById("roleTemplate");

    const roleContainer = document.getElementById("roleContainer");

    nacht0Volgorde.forEach(roleKey => {
        // Check if the role is a group and handle accordingly
        let roleName = roleMapper[roleKey][variantMapper[gameData.thema]];
        if (roleGroups[roleKey]) {
                const nameField = nameFieldTemplate.content.cloneNode(true);
                nameField.querySelector("#groupName").textContent = roleName
                nameField.querySelector("#roleTooltip").textContent = translateToolTip(roleKey);


            roleGroups[roleKey].forEach(subRoleKey => {
                let roleName = roleMapper[subRoleKey][variantMapper[gameData.thema]];
                let cardCount = gameData["roles"][subRoleKey];
                for (let i = 0; i < cardCount; i++) {
                    const roleForm = roleFormTemplate.content.cloneNode(true);
                    roleForm.querySelector("#naamRole").textContent = roleName;
                    roleForm.querySelector("#roleInputField").setAttribute("name",`${subRoleKey}-${i+1}`);
                    nameField.appendChild(roleForm);
                }
            })
            // Only append when not empty
            if (nameField.querySelectorAll("#roleInputField").length > 0) {
                roleContainer.appendChild(nameField);
            }

        } else {
            if (gameData["roles"][roleKey] > 0) {
                const nameField = nameFieldTemplate.content.cloneNode(true);
                nameField.querySelector("#groupName").textContent = roleName;
                nameField.querySelector("#roleTooltip").textContent = translateToolTip(roleKey);
                const roleForm = roleFormTemplate.content.cloneNode(true);
                roleForm.querySelector("#naamRole").textContent = roleName;
                roleForm.querySelector("#roleInputField").setAttribute("name", `${roleKey}-${1}`);
                nameField.appendChild(roleForm);
                roleContainer.appendChild(nameField);
            }




        };
    });
}

