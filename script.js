document.addEventListener("DOMContentLoaded", function () {
    const terrain = document.getElementById("terrain");
    const trappedWater = document.getElementById("trapped-water");

    //Initialize empty array and wait for user input
    let heights = [];

    function buildTerrain(heights) {
        terrain.innerHTML = "";
        heights.forEach(height => {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.height = height * 40 + "px";
            terrain.insertBefore(cell, terrain.firstChild);
        });
    }

    //Logic about calculating the water trapped.
    function calculateTrappedRainwater(heights) {
        let trappedWater = 0;
        let leftMax = 0;
        let rightMax = 0;
        let left = 0;
        let right = heights.length - 1;

        while (left <= right) {
            if (heights[left] <= heights[right]) {
                if (heights[left] > leftMax) {
                    leftMax = heights[left];
                } else {
                    trappedWater += leftMax - heights[left];
                }
                left++;
            } else {
                if (heights[right] >= rightMax) {
                    rightMax = heights[right];
                } else {
                    trappedWater += rightMax - heights[right];
                }
                right--;
            }
        }

        return trappedWater;
    }

    window.generateTerrain = function () {
        //Gets input from the input field
        const inputElement = document.getElementById("heightsInput");
        //Splits the value and adds them into the array
        const inputValues = inputElement.value.split(",").map(value => parseInt(value.trim(), 10));

        // Checks if the number is valid
        if (inputValues.some(isNaN)) {        
            alert("Please enter values separated by commas(',')");
            return;
        }
        //Initialize heights array
        heights = inputValues;

        //We call the buildTerrain to build the terrain as per inputs
        buildTerrain(heights);

        trappedWater.textContent = calculateTrappedRainwater(heights);
    };

    buildTerrain(heights);
});
