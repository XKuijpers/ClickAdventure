document.getElementById("mainTitle").innerText = "Point and Click Adventure";

//Game state
let gameState = {
    "inventory": [],
    "brickPickedUp": false,
    "chestOpened": false,
    "activatedPillar": false,
    "metStatue": false
}

//Load data from save file
/*
fetch("data/save.json").then((response) => {
    if (response.status == 404) {
        alert("File not found!");
    }

    else {
        return response.json();
    }
}).then((resJson) => {
    gameState = resJson;
    runGame();
}).catch((error) => {
    console.error(error);
})
*/

function runGame() {
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

    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        //TODO: calc offset based on character size
        //TODO: making dialog functionality

        if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
            if (e.target.id !== "heroImage") {
                mainCharacter.style.left = x - offsetCharacter + "px";
                mainCharacter.style.top = y - offsetCharacter + "px";
            }

            switch (e.target.id) {
                case "key":
                    showMessage(heroSpeech, "I found the key!", heroAudio);
                    console.log("I found the key!");
                    document.getElementById("key").remove();
                    changeInventory("Key", "add");
                    break;

                case "brokenPillar":
                    if (gameState.brickPickedUp == false) {
                        showMessage(heroSpeech, "I found a stone brick!", heroAudio);
                        console.log("I found a stone brick!");
                        changeInventory("Brick", "add");
                        gameState.brickPickedUp = true;
                    }

                    else {
                        showMessage(heroSpeech, "There are no more loose bricks in this pillar.", heroAudio);
                        console.log("There are no more loose bricks in this broken pillar.");
                    }
                    break;

                case "chest":
                    if (gameState.chestOpened == false) {
                        if (checkItem("Key")) {
                            changeInventory("Key", "remove");
                            showMessage(heroSpeech, "I luckily managed to open the chest with this key.", heroAudio);
                            setTimeout(showMessage, sec * 4, heroSpeech, "Wait a minute, what's this?", heroAudio);
                            setTimeout(showMessage, sec * 8.1, heroSpeech, "Awesome, I found a diamond! Now what can I do with this..?", heroAudio);
                            console.log("I opened the chest.");
                            setTimeout(changeInventory, sec * 8.1, "Diamond", "add");
                            gameState.chestOpened = true;
                        }

                        else if (checkItem("Brick")) {
                            changeInventory("Brick", "remove");
                            showMessage(heroSpeech, "Damn it! This stone brick broke off when trying to open the chest.", heroAudio);
                            console.log("Damn it! This stone brick broke when trying to open the chest.");
                        }

                        else {
                            showMessage(heroSpeech, "Fuck! This chest is locked and I don't have a way to open it.", heroAudio);
                            console.log("Fuck! This chest is locked and I don't have a way to open it.");
                        }
                    }

                    else {
                        showMessage(heroSpeech, "There doesn't seem to be anything left inside of this chest.", heroAudio);
                        console.log("I already opened the chest.");
                    }
                    break;

                case "statue":
                    if (gameState.activatedPillar == false) {
                        showMessage(heroSpeech, "Hey, a statue. It looks quite unmaintained.", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, sec * 4);
                        setTimeout(showMessage, sec * 4, counterSpeech, "I can hear you, you know..?", counterAudio);
                        setTimeout(showMessage, sec * 8, heroSpeech, "Wait, what? Did that statue just talk to me?", heroAudio);
                        setTimeout(showMessage, sec * 12, counterSpeech, "I did, yes. So what?", counterAudio);
                        setTimeout(showMessage, sec * 16, heroSpeech, "Nothing! I just did not expect a stone figure to talk back to me. But since you can talk, do you have any idea where I can find something to open the chest with?", heroAudio);
                        setTimeout(showMessage, sec * 20, counterSpeech, "If you don't disrespect me like that again, sure.. I'll give you a hint: It is at one's final destination.", counterAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, sec * 24);
                        console.log("Hey you.. Wanna know where the key is? It's at one's final destination.");

                        gameState.metStatue = true;
                    }

                    else {
                        if (gameState.metStatue == true) {
                            showMessage(heroSpeech, "It's me again!", heroAudio);
                        }

                        else {
                            showMessage(heroSpeech, "Who are you?", heroAudio);

                            gameState.metStatue = true;
                        }
                    }
                    break;

                case "ceremonyPillar":
                    if (gameState.activatedPillar == false) {
                        if (checkItem("Diamond")) {
                            showMessage(heroSpeech, "Hm, interesting. This diamond seems to react in a certain way to this pillar.", heroAudio);
                            setTimeout(showMessage, sec * 4.1, heroSpeech, "It's really pulling towards the pillar as if it's a magnetic field.", heroAudio);
                            setTimeout(showMessage, sec * 8.2, heroSpeech, "Wait, wait, wait! The diamond! It is going inside of the pillar!", heroAudio);

                            setTimeout(changeInventory, sec * 8.2, "Diamond", "remove");
                            setTimeout(function () { activatedPillar.style.opacity = 1 }, sec * 8.2);
                            console.log("Wow! It glows blue now.")

                            setTimeout(showMessage, sec * 12.3, heroSpeech, "Wait, what happened? Did that pillar just take my diamond?", heroAudio);
                            setTimeout(showMessage, sec * 16.4, heroSpeech, "THE PILLAR EVEN TURNED BLUE?", heroAudio);
                            setTimeout(showMessage, sec * 20.5, heroSpeech, "I NEED to tell someone about this immediately!", heroAudio);

                            gameState.activatedPillar = true;
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
         * @param {strng} itemId 
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
}

runGame();