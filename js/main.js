document.getElementById("mainTitle").innerText = "Point and Click Adventure";

//Game state
let gameState = {
    "inventory": [],
    "brickPickedUp": false,
    "keyPickedUp": false,
    "chestOpened": false,
    "activatedPillar": false,
    "metStatue": false
}

localStorage.removeItem("gameState");

if (Storage) {
    if (localStorage.gameState) {
        // User LocalStorage gameState string and convert it to an object. Then store it into gameState.
        gameState = JSON.parse(localStorage.gameState);
    }

    else {
        // Convert local object variable to a string. Then store it into LocalStorage.
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
}

//Game window reference
const gameWindow = document.getElementById("gameWindow");
const inventoryList = document.getElementById("inventoryList");
const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

//Speech bubbles
const heroSpeech = document.getElementById("heroSpeech");
const counterSpeech = document.getElementById("counterSpeech");

//Audio for dialog
const heroAudio = document.getElementById("heroAudio");
const counterAudio = document.getElementById("counterAudio");

//Avatar
const counterAvatar = document.getElementById("counterAvatar");

//Interactable appearances
const activatedPillar = document.getElementById("activatedPillar");

if (gameState.keyPickedUp) {
    document.getElementById("key").remove();
}

if (gameState.activatedPillar) {
    activatedPillar.style.opacity = 1;
}

updateInventory(gameState.inventory, inventoryList);

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }

        switch (e.target.id) {
            case "key":
                showMessage(heroSpeech, "Hey, look at that. I found a key!", heroAudio);
                console.log("I found the key!");
                document.getElementById("key").remove();
                changeInventory("Key", "add");

                gameState.keyPickedUp = true;

                saveGameState(gameState);
                break;

            case "brokenPillar":
                if (gameState.brickPickedUp == false) {
                    showMessage(heroSpeech, "Cool, I found a stone brick.", heroAudio);
                    console.log("I found a stone brick!");
                    changeInventory("Brick", "add");
                    gameState.brickPickedUp = true;

                    saveGameState(gameState);
                }

                else {
                    showMessage(heroSpeech, "There seem to be no more loose stone bricks in this pillar.", heroAudio);
                    console.log("There are no more loose bricks in this broken pillar.");
                }
                break;

            case "chest":
                if (gameState.chestOpened == false) {
                    if (checkItem("Key")) {
                        changeInventory("Key", "remove");
                        showMessage(heroSpeech, "Awesome, I managed to open the chest with this key.", heroAudio);
                        setTimeout(showMessage, sec * 4, heroSpeech, "Wait a minute, what's this?", heroAudio);
                        setTimeout(showMessage, sec * 8.1, heroSpeech, "Oh, I found a diamond! Now this is a real treasure!", heroAudio);
                        console.log("I opened the chest.");
                        setTimeout(changeInventory, sec * 8.1, "Diamond", "add");
                        gameState.chestOpened = true;

                        setTimeout(saveGameState, sec * 8.1, gameState);
                    }

                    else if (checkItem("Brick")) {
                        changeInventory("Brick", "remove");
                        showMessage(heroSpeech, "Damn it! This stone brick broke when trying to open the chest.", heroAudio);
                        console.log("Damn it! This stone brick broke when trying to open the chest.");

                        saveGameState(gameState);
                    }

                    else {
                        showMessage(heroSpeech, "Shit! This chest is locked and I don't have a way to open it.", heroAudio);
                        console.log("Fuck! This chest is locked and I don't have a way to open it.");
                    }
                }

                else {
                    if (checkItem("Brick")) {
                        changeInventory("Brick", "remove");
                        showMessage(heroSpeech, "Heh, I guess I can store this stone brick in here for now.", heroAudio);
                        console.log("Stored the stone brick inside of the chest.");

                        saveGameState(gameState);
                    }

                    else {
                        showMessage(heroSpeech, "There sadly doesn't seem to be anything useful left inside of this chest.", heroAudio);
                        console.log("I already opened the chest.");
                    }
                }
                break;

            case "statue":
                if (gameState.activatedPillar == false) {
                    showMessage(heroSpeech, "Hey, a statue. It looks quite unmaintained.", heroAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 1; }, sec * 4);
                    setTimeout(showMessage, sec * 4, counterSpeech, "I can hear you, you know..?", counterAudio);
                    setTimeout(showMessage, sec * 8, heroSpeech, "Wait, what? Did that statue just talk to me?", heroAudio);
                    setTimeout(showMessage, sec * 12, counterSpeech, "I did, yes. So what?", counterAudio);
                    setTimeout(showMessage, sec * 16, heroSpeech, "Nothing! I just didn't expect a statue to talk back to me.", heroAudio);
                    setTimeout(showMessage, sec * 20.1, heroSpeech, "But since you can talk, do you have any idea where I can find something to open the chest with?", heroAudio);
                    setTimeout(showMessage, sec * 24.1, counterSpeech, "If you don't disrespect me like that again, sure.", counterAudio);
                    setTimeout(showMessage, sec * 28.2, counterSpeech, "I'll give you a hint; You can find it at someone's final destination.", counterAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 0; }, sec * 32.2);
                    console.log("Hey you.. Wanna know where the key is? It's at one's final destination.");

                    gameState.metStatue = true;

                    setTimeout(saveGameState, sec * 32.2, gameState);
                }

                else {
                    if (gameState.metStatue == true) {
                        showMessage(heroSpeech, "It's me again!", heroAudio);
                    }

                    else {
                        showMessage(heroSpeech, "Hey you, statue! Did you see what happened right now?", heroAudio);
                        setTimeout(showMessage, sec * 4.1, heroSpeech, "...", heroAudio);
                        setTimeout(showMessage, sec * 8.2, heroSpeech, "Who am I kidding? Obviously a statue doesn't talk back..", heroAudio);
                        setTimeout(showMessage, sec * 12.2, counterSpeech, "PLACEHOLDER", counterAudio);

                        gameState.metStatue = true;

                        saveGameState(gameState);
                    }
                }
                break;

            case "ceremonyPillar":
                if (gameState.activatedPillar == false) {
                    if (checkItem("Diamond")) {
                        showMessage(heroSpeech, "Hm, interesting. This diamond seems to react in a certain way to this pillar.", heroAudio);
                        setTimeout(showMessage, sec * 4.1, heroSpeech, "It's really pulling towards the pillar as if it's a magnetic field.", heroAudio);
                        setTimeout(showMessage, sec * 8.2, heroSpeech, "Wait, wait, wait! The diamond! It is going inside of the pillar!", heroAudio);
                        setTimeout(showMessage, sec * 12.3, heroSpeech, "Wait, what happened? Did that pillar just take my diamond?", heroAudio);

                        setTimeout(changeInventory, sec * 12.3, "Diamond", "remove");
                        setTimeout(function () { activatedPillar.style.opacity = 1 }, sec * 12.3);
                        console.log("Wow! It glows blue now.")

                        setTimeout(function () { mainCharacter.style.left = 650 + "px"; }, sec * 12.3)
                        setTimeout(function () { mainCharacter.style.top = 493 + "px"; }, sec * 12.3)

                        setTimeout(showMessage, sec * 16.4, heroSpeech, "THE PILLAR EVEN TURNED BLUE?!", heroAudio);

                        setTimeout(function () { mainCharacter.style.left = 632 + "px"; }, sec * 16.4)

                        setTimeout(showMessage, sec * 20.5, heroSpeech, "I NEED to tell someone about this immediately!", heroAudio);

                        gameState.activatedPillar = true;

                        setTimeout(saveGameState, sec * 20.5, gameState);
                    }

                    else {
                        showMessage(heroSpeech, "This pillar is lame compared to the other ones..", heroAudio);
                        console.log("Looks like an unactivated pillar.");
                    }
                }

                else {
                    showMessage(heroSpeech, "I feel a strong energy coming from this pillar.", heroAudio);
                    console.log("I already activated this pillar.");
                }
                break;

            default:
                break;
        }
    }
}

/**
     * Add or remove item in inventory
     * @param {string} itemName 
     * @param {string} action 
     */

function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("Wrong parameter given to changeInventory()");
        return;
    }

    switch (action) {
        case "add":
            gameState.inventory.push(itemName);
            break;

        case "remove":
            gameState.inventory = gameState.inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });

            document.getElementById("inv-" + itemName).remove();
            break;
    }

    updateInventory(gameState.inventory, inventoryList);

}

/**
 * This returns string value if it exists wihin the array
 * @param {string} itemName 
 * @returns 
 */

function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}

/**
 * Needs a name for displaying item and html id name
 * @param {string} itemName 
 * @param {string} itemId 
 */

function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = "";
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inv-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * It will show dialog and trigger sound
 * @param {getElementById} targetBubble 
 * @param {string} message 
 * @param {getElementById} targetSound
 */

function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, sec * 4, targetBubble, targetSound);
}

/**
 * Hides message and pauses the audio
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound 
 */

function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
}

/**
 * Saves gameState into LocalStorage
 * @param {Object} gameState 
 */

function saveGameState(gameState) {
    localStorage.gameState = JSON.stringify(gameState);
}