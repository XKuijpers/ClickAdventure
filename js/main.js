document.getElementById("mainTitle").innerText = "Point and Click Adventure";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

const tree1 = document.getElementById("squareTree");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //FIX: character doesn't animate on first click
    //FIX: character can go out of bounds when clicking on itself
    //TODO: calc offset based on character size
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    switch (e.target.id) {
        case "squareTree":
            tree1.style.opacity = 0.5;
            break;

        case "door":
            console.log('clicked on door');
            break;

        default:
            tree1.style.opacity = 1;
    }
}