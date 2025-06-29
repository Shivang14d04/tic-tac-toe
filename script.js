let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset-button");
let newGameBtn = document.querySelector(".new-button");
let message = document.querySelector("#message");
let messageContainer = document.querySelector(".message-container");
let turnO = true;
let moveCount = 0; 

const winner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    turnO = true;
    moveCount = 0; 
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
    messageContainer.classList.add("hide");
};

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const checkWinner = () => {
    for (let pattern of winner) {
        let val1 = boxes[pattern[0]].innerHTML;
        let val2 = boxes[pattern[1]].innerHTML;
        let val3 = boxes[pattern[2]].innerHTML;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return;
        }
    }

   
    if (moveCount === 9) {
        showDraw();
    }
};

const showWinner = (winner) => {
    message.innerHTML = ` Winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disableboxes();
};

const showDraw = () => {
    message.innerHTML = " It's a Draw!";
    messageContainer.classList.remove("hide");
    disableboxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerHTML !== "") return;

        if (turnO) {
            box.innerHTML = "O";
            turnO = false;
        } else {
            box.innerHTML = "X";
            turnO = true;
        }

        box.disabled = true;
        moveCount++; 
        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
