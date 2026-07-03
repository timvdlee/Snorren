
// Map variant to index
export const variantMapper={
    "Standaard":0,
    "Circus":1,
    "Piraten":2,
    "Viking":3
};

export const firstNightTooltip={
    "_burger":"Laat ze hun hand opsteken",
    "_ziener":"Kies een speler en bekijk zijn/haar rol",
    "_beschermer":"Kies een speler en bescherm hem/haar voor de nacht tegen ${_snorren}",
    "_beschermgod":"Verplaats éénmalig de bescherming van de ${_beschermer} naar een andere speler",
    "_priester": "Kies twee geliefden",
    "_jager": "Mag iemand meenemen in de dood als je sterft",
    "_scooterjeugd": "Kan eenmalig de nacht verstoren waardoor ${_snorren} niemand kunnen vermoorden",
    "_snor": "Wordt wakker en kies een speler om te vermoorden",
    "_alphaSnor":"Wordt wakker en kies een speler om te vermoorden",
    "_manMetPlakSnor": "Mag wakker worden met ${_snorren} maar zijn stem telt niet mee. Heeft als toel te winnen met de ${_burgers}",
    "_zelfmoordterrorist": "Mag zichzelf opblazen en neemt de twee personen naast hem mee in de dood.",
    "_prinsCarnaval": "Mag eenmalig de polonaise uitroepen. Doet verder niks maar is wel grappig",
    "_burgemeester": "Hou verkiezingen indien er geen ${_burgemeester} is",
    "_geliefden": "Je mag nooit op elkaar stemmen. Als één van jullie sterft, sterft de ander ook. Jullie doel is om samen te winnen.",
    "_geliefde": "Je bent verliefd op de andere geliefde.",
    "_snorren": "Worden de eerste nacht wakker op te bepalen wie ze in elkaar gaan slaan! Betekend niks maar is wel persoonlijk.",
    "_burgers": "Laat ze niet wakker worden maar laat ze alleen hun hand opsteken en noteer hun naam"

}

export const nightTooltip={
    "_ziener": "Kies een speler om zijn/haar rol te bekijken",
    "_beschermer": "Kies een speler om te beschermen tegen de ${_snorren}",
    "_beschermgod": "Wil je de bescherming van de ${_beschermer} verplaatsen naar een andere speler?",
    "_scooterjeugd": "Wil je de nacht verstoren waardoor de ${_snorren} niemand kunnen vermoorden?", 
    "_snorren": "Word wakker en kies een speler om te vermoorden — Indien er de vorige ronde een ${_snor} is overleden mag de ${_alphaSnor} een speler naar keuze in een snor veranderen",
    "_alphaSnor": "Kies een speler om te veranderen in een snor"
}

export const roleMapper={ 
    "_burger":["Burger","Bezoeker","Matroos","Viking"],
    "_ziener":["Ziener","Goochelaar", "Hofmeester","Odin"],
    "_beschermer":["Beschermer","Circusleeuw", "Scheepshond","Walkure"],
    "_beschermgod":["Beschermgod","Leeuwentemmer", "Hondenmeester","Norn"],
    "_priester":["Priester","Acrobaat", "Bootsman","Thor"],
    "_jager":["Jager","Messenwerper", "Wapensmid","Sindri"],
    "_scooterjeugd":["Scooterjeugd","Clown", "Dronkaard","Beschonken Viking"],
    "_snor":["Snor","Weerwolf","Piraat","Handlanger Loki"],
    "_alphaSnor":["Alpha Snor","Snorweerwolf","Snorbaard","Loki"],
    "_manMetPlakSnor":["Man met Plaksnor","Behaarde Man","Matroos met ooglapje","Vidar"],
    "_zelfmoordterrorist":["Zelfmoordterrorist","Levende Kanonskogel","Zelfmoordterrorist","Berserker"],
    "_prinsCarnaval":["Prins Carnaval","Prins Carnaval","Rumbaard","Mede Brouwer"],
    "_burgemeester":["Burgemeester","Circusdirecteur","Kapitein","Jarl"],
    "_geliefden":["Geliefden","Geliefden","Geliefden","Geliefden"],
    "_geliefde":["Geliefde","Geliefde","Geliefde","Geliefde"],
    "_snorren":["De Snorren","De Weerwolven","De Piraten","Loki en zijn handlangers"],
    "_burgers":["Burgers","Bezoekers","Matrozen","Vikingen"]

};


export const playerCountMap = {
    8:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor"],
    9:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor"],
    10:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist"],
    11:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist","_snor"],
    12:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist","_snor","_prinsCarnaval"],
    13:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist","_snor","_prinsCarnaval","_burger"],
    14:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist","_snor","_prinsCarnaval","_burger","_burger"],
    15:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist","_snor","_prinsCarnaval","_burger","_burger","_burger"],
    16:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist","_snor","_prinsCarnaval","_burger","_burger","_burger","_snor"],
    17:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist","_snor","_prinsCarnaval","_burger","_burger","_burger","_snor","_burger"],
    18:["_ziener","_beschermer","_beschermgod","_priester","_jager","_scooterjeugd","_alphaSnor","_snor","_manMetPlakSnor","_zelfmoordterrorist","_snor","_prinsCarnaval","_burger","_burger","_burger","_snor","_burger","_burger"],
};

export const roleGroups = {
    "_snorren":["_alphaSnor","_snor"],
    "_burgers":["_burger"],
    "_geliefden":["_geliefde"],

};

export const nacht0Volgorde = ["_beschermer","_beschermgod","_scooterjeugd","_priester","_geliefden","_jager","_zelfmoordterrorist","_prinsCarnaval","_manMetPlakSnor","_snorren","_ziener","_burgers"]

export const nachtxVolgorde = ["_ziener","_beschermer","_beschermgod","_scooterjeugd","_snorren","_alphaSnor"]