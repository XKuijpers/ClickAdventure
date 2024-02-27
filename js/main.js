document.getElementById("mainTitle").innerText = "Point and Click Adventure";

//Game state
let gameState = {
    "inventory": [],
    "brickPickedUp": false
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
                    if (checkItem("Key")) {
                        changeInventory("Key", "remove");
                        showMessage(heroSpeech, "I thankfully managed to open the chest with this key.", heroAudio);
                        console.log("I opened the chest.");
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
                    break;

                case "statue":
                    showMessage(heroSpeech, "Hey, a statue. It looks quite unmaintained.", heroAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 1; }, sec * 4);
                    setTimeout(showMessage, sec * 4, counterSpeech, "I can hear you, you know..?", counterAudio);
                    setTimeout(showMessage, sec * 8, heroSpeech, "Wait what? Did that statue just talk to me?", heroAudio);
                    setTimeout(showMessage, sec * 12, counterSpeech, "I did, yes. So what?", counterAudio);
                    setTimeout(showMessage, sec * 16, heroSpeech, "Nothing! I just did not expect a stone figure to talk back to me. But since you can talk, do you have any idea where I can find something to open the chest with?", heroAudio);
                    setTimeout(showMessage, sec * 20, counterSpeech, "If you don't disrespect me like that again, sure.. I'll give you a hint: It is at one's final destination.", counterAudio);
                    setTimeout(function () { counterAvatar.style.opacity = 0; }, sec * 24);
                    console.log("Hey you.. Wanna know where the key is? It's at one's final destination.");
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