document.getElementById("mainTitle").innerText = "Point and Click Adventure";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Inventory
let inventory = [];
const inventoryList = document.getElementById("inventoryList")

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

const tree1 = document.getElementById("squareTree");
const key1 = document.getElementById("key");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //TODO: calc offset based on character size
    if (e.target.id !== "heroImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    switch (e.target.id) {
        case "key":
            getItem("Rusty key", "rustyKey");
            break;

        case "brokenPillar":
            getItem("Stone brick", "stoneBrick");
            break;

        case "chest":
            if (checkItem("Rusty key")) {
                removeItem("Rusty key", "rustyKey");
                console.log("I opened the chest.");
            }

            else if (checkItem("Stone brick")) {
                removeItem("Stone brick", "stoneBrick");
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
     * Checks if the value exists within the array
     * If not then it adds value to the array and use showItem function
     * @param {string} itemName 
     * @param {string} itemId 
     */

    function getItem(itemName, itemId) {
        if (!checkItem(itemName)) {
            inventory.push(itemName);
            showItem(itemName, itemId);
        }
        console.log(inventory);
    }

    /**
     * This returns string value if it exists wihin the array
     * @param {string} itemName 
     * @returns 
     */

    function checkItem(itemName) {
        return inventory.includes(itemName);
    }

    /**
     * Needs a name for displaying item and html id name
     * @param {string} itemName 
     * @param {strng} itemId 
     */

    function showItem(itemName, itemId) {
        console.log("You\'ve found a " + itemName + "!");
        const keyElement = document.createElement("li");
        keyElement.id = itemId;
        keyElement.innerText = itemName;
        inventoryList.appendChild(keyElement);
    }

    /**
    * Removes item by displaying item and html id name
    * @param {string} itemName 
    * @param {strng} itemId 
    */

    function removeItem(itemName, itemId) {
        //Remove item in Array
        inventory = inventory.filter(function (newInventory) {
            return newInventory !== itemName;
        });

        document.getElementById(itemId).remove();
    }
}