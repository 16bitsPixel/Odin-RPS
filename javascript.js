// create a grid function
function createGrid(size) {
    let grid = document.querySelector(".grid");
    grid.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    grid.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
    for (let i = 0; i < size * size; i++) {
        let square = document.createElement("div");
        square.classList.add("pixel");
        //square.style.border = "1px dashed black";

        // if hover over a square, change color
        square.addEventListener("mouseover", () => {
            
            // rainbow event
            if (colorValue == "rainbow") {
                square.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            }
            else if (colorValue == "erase") {
                square.style.backgroundColor = null;
                square.classList.remove("dark");
            }
            else {
                if (darken) {
                    if (!square.classList.contains("dark")) {
                        square.classList.add("dark");
                        square.style.backgroundColor = colorValue;
                    }
                    else {
                        square.style.backgroundColor = darkenColor(colorValue);
                    }
                }
                else {
                    square.style.backgroundColor = colorValue;
                }
            }
        });
        
        grid.append(square);
    }
}

// color picker
let colorPicker = document.querySelector(".colorPicker");
let color = document.querySelector(".colors");
let colorValue = "black";
colorPicker.addEventListener("change", () => {
    color.style.backgroundColor = colorPicker.value;
    if (!eraserBtn.checked && !rainbowBtn.checked) {
        colorValue = colorPicker.value;
    }
});

// clear grid button
document.querySelector(".clearButton").addEventListener("click", () => {
    clearGrid();
    document.querySelector(".clear").style.transform = "scale(1.1)";
    setTimeout(() => {document.querySelector(".clear").style.transform = "scale(1)";}, 100);
});

// clear grid function
function clearGrid() {
    let pixels = Array.from(document.querySelectorAll(".pixel"));
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = "white";
        pixel.classList.remove("dark");
    });
}

// slider
let slider = document.querySelector(".slider");
let sliderText = document.querySelector(".gridSizeText");
slider.addEventListener("input", () => {
    clearGrid();
    createGrid(slider.value);
    sliderText.textContent = slider.value + " x " + slider.value;
});

// eraser
let eraserBtn = document.querySelector(".eraserButton");
eraserBtn.addEventListener("change", () => {
    if (eraserBtn.checked) {
        document.querySelector(".eraser").style.opacity = 1;
        document.querySelector(".eraser").style.transform = "scale(1.1)";
        colorValue = "erase";
    }
    else {
        document.querySelector(".eraser").style.opacity = null;
        document.querySelector(".eraser").style.transform = "scale(1)";

        // event rainbow
        if (rainbowBtn.checked) {
            colorValue = "rainbow";
        }
        else {
            colorValue = colorPicker.value;
        }
    }
});

// rainbow
let rainbowBtn = document.querySelector(".rainbowButton");
rainbowBtn.addEventListener("change", () => {
    if (rainbowBtn.checked) {
        document.querySelector(".rainbow").style.opacity = 1;
        document.querySelector(".rainbow").style.transform = "scale(1.1)";

        // event that eraser is checked as well
        if (eraserBtn.checked) {
            return;
        }
        colorValue = "rainbow";
    }
    else {
        document.querySelector(".rainbow").style.opacity = null;
        document.querySelector(".rainbow").style.transform = "scale(1)";

        // event eraser is checked
        if (eraserBtn.checked) {
            return;
        }

        colorValue = colorPicker.value;
    }
});

// darken
let darken;
let darkBtn = document.querySelector(".darkButton");
darkBtn.addEventListener("change", () => {
    if (darkBtn.checked) {
        document.querySelector(".darkening").style.opacity = 1;
        document.querySelector(".darkening").style.transform = "scale(1.1)";
        darken = true;
    }
    else {
        document.querySelector(".darkening").style.opacity = null;
        document.querySelector(".darkening").style.transform = "scale(1)";
        darken = false;
    }
});

function darkenColor(hex) {
    let r = parseInt(hex[1] + hex[2], 16) * 0.7;
    let g = parseInt(hex[3] + hex[4], 16) * 0.7;
    let b = parseInt(hex[5] + hex[6], 16) * 0.7;

    return `rgb(${r}, ${g}, ${b})`;
}

createGrid(16);
