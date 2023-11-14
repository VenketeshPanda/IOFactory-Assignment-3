document.addEventListener("DOMContentLoaded", function () {
    const terrain = document.getElementById("terrain");
    const trappedWater = document.getElementById("trapped-water");

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
        const inputElement = document.getElementById("heightsInput");
        const inputValues = inputElement.value.split(",").map(value => parseInt(value.trim(), 10));

        
        if (inputValues.some(isNaN)) {
            alert("Please enter valid numeric values separated by commas.");
            return;
        }
        heights = inputValues;
        buildTerrain(heights);

        trappedWater.textContent = calculateTrappedRainwater(heights);
    };
    
    buildTerrain(heights);
});
