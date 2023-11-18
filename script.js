document.addEventListener("DOMContentLoaded", function () {
    const terrainTable = document.getElementById("terrain");
    const trappedWater = document.getElementById("trapped-water");

    let heights = [];

    function buildTerrain(heights) {
        terrainTable.innerHTML = "";

        for (let i = 0; i < Math.max(...heights); i++) {
            const row = document.createElement("tr");

            heights.forEach((height, index) => {
                const cell = document.createElement("td");
                cell.className = "cell";

                if (heights[index] >= Math.max(...heights) - i) {
                    cell.classList.add("terrain");
                } else {
                    //Logic for determining water
                    const leftNonZero = findNonZeroLeft(heights, index);
                    const rightNonZero = findNonZeroRight(heights, index);
                    const blueHeight = (heights[index] !== 0) ?  Math.min(leftNonZero, rightNonZero) :  Math.min(leftNonZero, rightNonZero) - heights[index];

                    
                    if (i > Math.max(...heights) - heights[index]) {
                        cell.classList.add("water");
                    } else if (blueHeight >= Math.max(...heights) - i) {
                        cell.classList.add("water");
                    }
                }

                row.appendChild(cell);
            });

            terrainTable.appendChild(row);
        }
    }

    function findNonZeroLeft(heights, index) {
        let maxLeft = 0;

        for (let i = index - 1; i >= 0; i--) {
            if (heights[i] > maxLeft) {
                maxLeft = heights[i];
            }
        }

        return maxLeft;
    }

    function findNonZeroRight(heights, index) {
        let maxRight = 0;

        for (let i = index + 1; i < heights.length; i++) {
            if (heights[i] > maxRight) {
                maxRight = heights[i];
            }
        }

        return maxRight;
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
        // Gets input from the input field
        const inputElement = document.getElementById("heightsInput");
        // Splits the value and adds them into the array
        const inputValues = inputElement.value.split(",").map(value => parseInt(value.trim(), 10));

        // Checks if the number is valid
        if (inputValues.some(isNaN)) {
            alert("Please enter values separated by commas(',')");
            return;
        }
        // Initialize heights array
        heights = inputValues;

        // We call the buildTerrain to build the terrain as per inputs
        buildTerrain(heights);

        trappedWater.textContent = calculateTrappedRainwater(heights);
    };

    buildTerrain(heights);
});
