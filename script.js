document.addEventListener("DOMContentLoaded", function () {
    const terrain = document.getElementById("terrain");
    const trappedWater = document.getElementById("trapped-water");

    const heights = [0,4,0,0,0,6,0,6,4,0]; // Example heights, modify as needed

    function buildTerrain(heights) {
        terrain.innerHTML = "";
        heights.forEach(height => {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.height = height * 40 + "px";
            terrain.insertBefore(cell, terrain.firstChild); // Insert cells at the beginning (top)
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

    buildTerrain(heights);
    trappedWater.textContent = calculateTrappedRainwater(heights);
});
