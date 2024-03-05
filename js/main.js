document.getElementById("mainTitle").innerText = "Point and Click Adventure";

//Game state
let gameState = {
    "inventory": [],
    "brickPickedUp": false,
    "keyPickedUp": false,
    "chestOpened": false,
    "activatedPillar": false,
    "metStatue": false,
    "toldStatue": false,
    "enteredRegionTwo": false,
    "metLordGhostOne": false
}

//localStorage.removeItem("gameState");

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
const lordOneAvatar = document.getElementById("lordOneAvatar");

//Interactable appearances
const activatedPillar = document.getElementById("activatedPillar");
const lordGhostOne = document.getElementById("lordGhostOne");

//Regions
const regionOneMap = document.getElementById("tileMap");
const regionTwoMap = document.getElementById("regionTwoMap");

if (gameState.keyPickedUp) {
    document.getElementById("key").remove();
}

if (gameState.activatedPillar) {
    activatedPillar.style.opacity = 1;
}

if (gameState.enteredRegionTwo) {
    document.getElementById("chest").remove();
    document.getElementById("lordGhostEntrance").remove();
    document.getElementById("signWest").remove();
    document.getElementById("signEast").remove();
    document.getElementById("ceremonyPillar").remove();
    document.getElementById("activatedPillar").remove();
    document.getElementById("statue").remove();
    document.getElementById("brokenPillar").remove();

    regionOneMap.style.opacity = 0;
    regionTwoMap.style.opacity = 1;
    lordGhostOne.style.opacity = 1;


    mainCharacter.style.transition = 0 + "s";
    mainCharacter.style.top = 66 + "px";
    mainCharacter.style.left = 762 + "px";

    setTimeout(function () { mainCharacter.style.transition = 1 + "s"; }, sec * 0.1);

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
                    if (gameState.toldStatue == true) {
                        showMessage(heroSpeech, "Listen, man. I really need to tell you about this!", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, sec * 4);
                        setTimeout(showMessage, sec * 4, counterSpeech, "I already told you that I don't have the energy to deal with you.", counterAudio);
                        setTimeout(showMessage, sec * 8, heroSpeech, "But I'm serious! Please listen to me!", heroAudio);
                        setTimeout(showMessage, sec * 12, counterSpeech, "And I'M serious as well! Buzz off before I'll show you how I deal with nuisances.", counterAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, sec * 16);
                        setTimeout(showMessage, sec * 16, heroSpeech, "Fuck! There's no way I'm going to convince him.", heroAudio);
                    }

                    else if (gameState.metStatue == true) {
                        showMessage(heroSpeech, "Hey there! It's me again!", heroAudio);
                        setTimeout(showMessage, sec * 4.1, heroSpeech, "You won't believe what just happened!", heroAudio);
                        setTimeout(showMessage, sec * 8.2, heroSpeech, "Do you see that rune to your left? I just activated that rune!!", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, sec * 12.2);
                        setTimeout(showMessage, sec * 12.2, counterSpeech, "There's no way you just did that.. The key was a lie, pal.", counterAudio);
                        setTimeout(showMessage, sec * 16.2, heroSpeech, "No, I'm serious! Turn around!!", heroAudio);
                        setTimeout(showMessage, sec * 20.2, counterSpeech, "Buzz off kid, and let me rest. I don't have the energy to deal with you right now.", counterAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, sec * 24.2);
                        setTimeout(showMessage, sec * 24.2, heroSpeech, "Well, damn it. Who am I going to tell about this now..?", heroAudio);

                        gameState.toldStatue = true;

                        setTimeout(saveGameState, sec * 24.2, gameState);
                    }

                    else {
                        showMessage(heroSpeech, "Hey you, statue! Did you see what happened right now?", heroAudio);
                        setTimeout(showMessage, sec * 4.1, heroSpeech, "...", heroAudio);
                        setTimeout(showMessage, sec * 8.2, heroSpeech, "Who am I kidding? Obviously a statue doesn't talk back..", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, sec * 12.2);
                        setTimeout(showMessage, sec * 12.2, counterSpeech, "Who dares to wake me up from my eternal slumber?", counterAudio);
                        setTimeout(showMessage, sec * 16.2, heroSpeech, "Me! Lord Ghost the II! I just activated this rune to your left, do you see it?", heroAudio);
                        setTimeout(showMessage, sec * 20.2, counterSpeech, "Don't act foolish, \"Dumb Ghost the II\", or whatever you just said.", counterAudio);
                        setTimeout(showMessage, sec * 24.3, counterSpeech, "That rune has been out of the running for ages, I don't have time for your nonsense.", counterAudio);
                        setTimeout(showMessage, sec * 28.3, heroSpeech, "No, I'm serious. Turn around!!", heroAudio);
                        setTimeout(showMessage, sec * 32.3, counterSpeech, "Buzz off kid, and let me rest. I don't have the energy to deal with you right now.", counterAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, sec * 36.3);
                        setTimeout(showMessage, sec * 36.3, heroSpeech, "Well, damn it. Who am I going to tell about this now..?", heroAudio);

                        gameState.metStatue = true;
                        gameState.toldStatue = true;

                        setTimeout(saveGameState, sec * 36.3, gameState);
                    }
                }
                break;

            case "ceremonyPillar":
                if (gameState.activatedPillar == false) {
                    if (checkItem("Diamond")) {
                        showMessage(heroSpeech, "Hm, interesting. This diamond seems to react in a certain way to this rune.", heroAudio);
                        setTimeout(showMessage, sec * 4.1, heroSpeech, "It's really pulling towards the rune as if it's a magnetic field.", heroAudio);
                        setTimeout(showMessage, sec * 8.2, heroSpeech, "Wait, wait, wait! The diamond! It is going inside of the rune!", heroAudio);
                        setTimeout(showMessage, sec * 12.3, heroSpeech, "Wait, what happened? Did that rune just take my diamond?", heroAudio);

                        setTimeout(changeInventory, sec * 12.3, "Diamond", "remove");
                        setTimeout(function () { activatedPillar.style.opacity = 1 }, sec * 12.3);
                        console.log("Wow! It glows blue now.")

                        setTimeout(function () { mainCharacter.style.left = 650 + "px"; }, sec * 12.3)
                        setTimeout(function () { mainCharacter.style.top = 493 + "px"; }, sec * 12.3)

                        setTimeout(showMessage, sec * 16.4, heroSpeech, "THE RUNE EVEN TURNED BLUE?!", heroAudio);

                        setTimeout(function () { mainCharacter.style.left = 632 + "px"; }, sec * 16.4)

                        setTimeout(showMessage, sec * 20.5, heroSpeech, "I NEED to tell someone about this immediately!", heroAudio);

                        gameState.activatedPillar = true;

                        setTimeout(saveGameState, sec * 20.5, gameState);
                    }

                    else {
                        showMessage(heroSpeech, "This rune is lame compared to the other ones..", heroAudio);
                        console.log("Looks like an unactivated rune.");
                    }
                }

                else {
                    showMessage(heroSpeech, "I feel a strong energy coming from this rune.", heroAudio);
                    console.log("I already activated this rune.");
                }
                break;

            case "lordGhostEntrance":
                if (gameState.toldStatue == false) {
                    showMessage(heroSpeech, "Hm, maybe I shouldn't leave yet. I have a feeling that there's more to this place.", heroAudio);
                }

                else {
                    showMessage(heroSpeech, "Alright then, you know what? If this stupid statue doesn't want to talk to me, I'll just go somewhere else.", heroAudio);
                    setTimeout(showMessage, sec * 4.1, heroSpeech, "I'm sure my cousin Lord Ghost the I would want to hear about this.", heroAudio);

                    gameState.enteredRegionTwo = true;

                    setTimeout(saveGameState, sec * 4.1, gameState);

                    setTimeout(function () { location.reload(); }, sec * 8.2)
                }
                break;

            case "signEast":
                showMessage(heroSpeech, "Ah, a sign! It says: \"Lord Ghost I is this way\".", heroAudio);
                break;

            case "signWest":
                showMessage(heroSpeech, "Ah, a sign! It says: \"Statue of Youth is this way\".", heroAudio);
                break;

            case "lordGhostOne":
                if (gameState.enteredRegionTwo) {
                    mainCharacter.style.top = 325 + "px";
                    mainCharacter.style.left = 196 + "px";

                    if (gameState.metLordGhostOne == false) {
                        showMessage(heroSpeech, "Cousin! You won't believe what just happened!", heroAudio);
                        setTimeout(function () { lordOneAvatar.style.opacity = 1; }, sec * 4);
                        setTimeout(showMessage, sec * 4, counterSpeech, "Pardon me, peasant? Don't you know I have a NAME?", counterAudio);
                        setTimeout(showMessage, sec * 8, heroSpeech, "Oh! Uh, I'm really sorry Lord Ghost the I.", heroAudio);
                        setTimeout(showMessage, sec * 12, counterSpeech, "Well then, that's better. Go on with what you were saying.", counterAudio);
                        setTimeout(showMessage, sec * 16, heroSpeech, "Ok ok, you won't believe this! You know that old deactivated rune near that statue?", heroAudio);
                        setTimeout(showMessage, sec * 20.1, heroSpeech, "I uh, accidentally activated that rune. It even glows blue now!", heroAudio);
                        setTimeout(showMessage, sec * 24.2, heroSpeech, "But this dumb statue doesn't want to believe me, and says I'm wasting his time..", heroAudio);
                        setTimeout(showMessage, sec * 28.2, counterSpeech, "What.. You came to disturb me with THIS news?", counterAudio);
                        setTimeout(showMessage, sec * 32.3, counterSpeech, "Don't you know I have BETTER things to do than listen to your fairytales?", counterAudio);
                        setTimeout(showMessage, sec * 36.4, counterSpeech, "I'm ROYALTY for fucks sake. I don't have the time for this.", counterAudio);
                        setTimeout(showMessage, sec * 40.4, heroSpeech, "But, cous- I mean Lord Ghost the I! Please! You have to believe me.", heroAudio);
                        setTimeout(showMessage, sec * 44.4, counterSpeech, "I said I DO NOT have the time for this. GOODBYE!", counterAudio);
                        setTimeout(function () { lordOneAvatar.style.opacity = 0; }, sec * 48.4);
                        setTimeout(showMessage, sec * 48.4, heroSpeech, "WHY IS THIS ENTIRE WORLD AGAINST ME?! WHAT DO I DO NOW??", heroAudio);

                        gameState.metLordGhostOne = true;

                        setTimeout(saveGameState, sec * 48.4, gameState);
                    }

                    else {
                        lordOneAvatar.style.opacity = 1;
                        showMessage(counterSpeech, "I SAID GOODBYE! GO AWAY! MOVE! CHOP CHOP! HASTA LA VISTA!!", counterAudio);
                        setTimeout(function () { lordOneAvatar.style.opacity = 0; }, sec * 4);
                    }
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