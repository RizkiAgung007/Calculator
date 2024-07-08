const displayHistory = document.querySelector(".history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number")
const operations = document.querySelectorAll(".operation")
const equals = document.querySelector(".equal")
const clearAll = document.querySelector(".all-clear")
const clearLast = document.querySelector(".last-entity")

let dishis = "";
let disinp = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((nums) => {
    nums.addEventListener("click", (e) => {
        if(e.target.innerText === "." && !haveDot) {
            console.log(e.target.innerText)
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            console.log("Sudah ada dot", e.target.innerText)
            return
        }
        disinp += e.target.innerText;
        displayInput.innerText = disinp;
    }); 
});

operations.forEach((ops) => {
    ops.addEventListener("click", (e) => {
        if(!disinp) return;
        haveDot = false;

        const opsName = e.target.innerText;
        if(dishis && disinp && lastOperation) {
            mathOperation()
        } else {
            result = parseFloat(disinp);
        }
        clearVar(opsName)
        lastOperation = opsName;
    })
})
function clearVar(name = "") {
    dishis += disinp + " " + name + " ";
    displayHistory.innerText = dishis;
    displayInput.innerText = "";
    disinp = "";
    tempResult.innerText = result;
}

function mathOperation() {
    if(lastOperation === "X") {
        result = parseFloat(result) * parseFloat(disinp);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(disinp);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(disinp);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(disinp);
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(disinp);
    }
}

equals.addEventListener("click", () => {
    if(!disinp || !dishis) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayInput.innerText= result;
    tempResult.innerText = "";
    disinp = result;
    dishis = "";
})

clearAll.addEventListener("click", () => {
    dishis = "";
    disinp = "";
    result = "";
    lastOperation = "";
    haveDot = false;
    displayHistory.innerText = "";
    displayInput.innerText = "";
    tempResult.innerText = "";
})

clearLast.addEventListener("click", () => {
    displayInput.innerText = "";
    disinp = "";
})

window.addEventListener("keydown", (e) => {
    if(
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"
    ) {
        clickButton(e.key);
    } else if(
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key);
    } else if(e.key === "*") {
        clickOperation("X")
    } else if(
        e.key === "Enter" ||
        e.key === "="
    ) {
        clickEqual()
    } else if (e.key === "Backspace") {
        clickClear()
    }
})

function clickButton(key) {
    numbers.forEach((button) => {
        if(button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key) {
    operations.forEach((opertaion) => {
        if(opertaion.innerText === key) {
            opertaion.click();
        }
    })
}

function clickEqual() {
    equals.click();
}

function clickClear() {
    clearAll.click();
}