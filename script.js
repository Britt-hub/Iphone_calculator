// identity and mimic the users input
// user's intent: input #, choose a #, and input another #. Then result

let prevEntry = 0;
let operator = null;
let currentEntry = 0;
let result = 0;

// this will allow user to select everything that is on the screen (input)

let display = document.querySelector('#display');
let button = document.querySelectorAll('.btn');
let operators = document.querySelectorAll('.operator')
updateScreen(result);

// create function 

button.forEach(btn => {
    btn.addEventListener("click", function () {
        let btnClicked = this.innerText;
        display.value = btnClicked;
        console.log("you clicked: ", btnClicked);

        // CREATE functionality for each btn to work 
        // 
        if (btnClicked === "AC") {
            currentEntry = 0;
            result = 0;
            removeActiveOperator();
        } else if (btnClicked === "+/-") {
            currentEntry *= -1;
            removeActiveOperator();
        } else if (btnClicked === ".") {
            currentEntry += ".";
            removeActiveOperator();
        } else if (btnClicked === "x") {
            console.log(btnClicked)
            btn.classList.add("active");
            prevEntry = currentEntry;
            operation = "*";
            currentEntry = "";
        } else if (btnClicked === "÷") {
            btn.classList.add("active")
            prevEntry = currentEntry;
            operation = "/";
            currentEntry = "";
        } else if (btnClicked === "+") {
            
            prevEntry = parseFloat(currentEntry);
            btn.classList.add("active");
            operation = "+";
            currentEntry = "";
        } else if (btnClicked === "-") {
            prevEntry = parseFloat(currentEntry);
            btn.classList.add("active");
            operation = "-";
            currentEntry = "";
        } else if (isNumber(btnClicked)) {
            // if 0 is displayed replaced the 0 with whatever the user clicked
            // or if a result is displayed already, reset the number
            removeActiveOperator();

            if (currentEntry === 0 ||  currentEntry === result) {
                currentEntry = btnClicked;
            } else {
                currentEntry += btnClicked;
            }
        
        } else if (isOperator(btnClicked)) {
            console.log(btnClicked)
            // btn.classList.add("active");
            prevEntry = currentEntry;
            operation = btnClicked;
            currentEntry = "";
        } else if (btnClicked === "%") {
            currentEntry /= 100;
            removeActiveOperator();
        } else if (btnClicked === "=") {
            result = operate(prevEntry, operation, currentEntry);
            operation = null;
            currentEntry = result;
        }
        updateScreen(currentEntry);

    })
});

//create a function to tell weather it is a number or not

function isNumber(value) {
    return !isNaN(value);
};

function isOperator(value) {
    return value === "÷" || value === "+" || value === "x" || value === "-"
}

// make a function to calculate 

function operate(a, operation, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operation) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;

    }
};

// this function is for displaying the result 

function updateScreen(result) {

    // line 103 has an issue
    let displayValue = result.toString();
    display.value = displayValue.substring(0, 6)
}

function removeActiveOperator() {
    operators.forEach(operator => {
        operator.classList.remove('active');
})

}