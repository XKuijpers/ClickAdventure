document.getElementById("mainTitle").innerText = "Point and Click Adventure";

//Game state
let gameState = {
    "inventory": [],
    "brickPickedUp": false
}

//Load data from save file
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

function runGame() {

    //Game window reference
    const gameWindow = document.getElementById("gameWindow");

    //Inventory
    const inventoryList = document.getElementById("inventoryList")

    //Main Character
    const mainCharacter = document.getElementById("hero");
    const offsetCharacter = 16;

    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        //TODO: calc offset based on character size
        //TODO: making dialog functionality

        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }

        switch (e.target.id) {
            case "key":
                console.log("Picked up the key.");
                document.getElementById("key").remove();
                changeInventory("Key", "add");
                break;

            case "brokenPillar":
                if (gameState.brickPickedUp == false) {
                    console.log("Picked up the brick.");
                    changeInventory("Brick", "add");
                    gameState.brickPickedUp = true;
                }

                else {
                    console.log("There are no more loose bricks in this pillar.");
                }
                break;

            case "chest":
                if (checkItem("Key")) {
                    changeInventory("Key", "remove");
                    console.log("I opened the chest.");
                }

                else if (checkItem("Brick")) {
                    changeInventory("Brick", "remove");
                    console.log("Damn it! This stone brick broke when trying to open the chest.");
                }

                else {
                    console.log("Fuck! This chest is locked and I don't have a way to open it.")
                }
                break;

            case "statue":
                console.log("Hey you.. Wanna know where the key is? It's at one's final destination.");
                break;

            default:
                break;
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

}