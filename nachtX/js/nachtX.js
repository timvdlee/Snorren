import {variantMapper,roleMapper,playerCountMap,nacht0Volgorde,roleGroups,firstNightTooltip} from '../../js/data.js';
const preventReloadFlag = false

let isKnopGeklikt = false;

document.addEventListener("DOMContentLoaded", function() {
    populatePlayers();
    const endNacht1Button = document.getElementById("endNacht1Button");
    translateTranslatableTargerts();
    
});
if (preventReloadFlag) {
    window.onbeforeunload = function(e) {
        // Alleen waarschuwen als er NIET op de knop is geklikt
        if (!isKnopGeklikt) {

            return "Weet je zeker dat je deze pagina wilt verlaten? Je gegevens zullen verloren gaan.";
        }
    };
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



