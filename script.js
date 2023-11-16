document.addEventListener("DOMContentLoaded", function () {
    const terrainTable = document.getElementById("terrain");
    const trappedWater = document.getElementById("trapped-water");

    // Initialize empty array and wait for user input
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
                    // Determine the height for the blue terrain using the updated findNonZeroLeft and findNonZeroRight
                    const leftNonZero = findNonZeroLeft(heights, index);
                    const rightNonZero = findNonZeroRight(heights, index);
                    const blueHeight = Math.min(leftNonZero, rightNonZero) - heights[index];
    
                    // Build blue-colored terrain on top of brown terrain wherever there is a chance
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
    

    // Helper function to find the immediate non-zero value on the left
    function findNonZeroLeft(heights, index) {
        let maxLeft = 0;

        for (let i = index - 1; i >= 0; i--) {
            if (heights[i] > maxLeft) {
                maxLeft = heights[i];
            }
        }

        return maxLeft;
    }

    // Helper function to find the immediate non-zero value on the right
    function findNonZeroRight(heights, index) {
        let maxRight = 0;

        for (let i = index + 1; i < heights.length; i++) {
            if (heights[i] > maxRight) {
                maxRight = heights[i];
            }
        }

        return maxRight;
    }


    // Logic about calculating the water trapped.
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
