# IOFactory-Assignment-3

Explanation about the logic on how to calculate the trapped rain water:

Intuition:

-> So water will be trapped only if the left block and the right block is greater than the current block.
-> So at every index we have to consider the left max and right max and we will do min(leftmax,rightmax)-height[i]. It will give the water trapped at index i.
-> The time complexity of this solution is O(N^2). Since we have to travel to left and right to find out the leftMax and rightMax for every index.


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


**Solution 1:**

-> Now to optimise the above solution, we will first find out the leftmax and rightmax for every index. We can do this by creating a prefixSum array(leftMax) and a suffixSum array(rightMax).

-> Once we have that, now for every index i, we can find it by min(leftMax[i],rightMax[i]) - height[i]. 

-> Since we can find the leftMax and rightMax for every index in O(1) time, the time complexity comes down to O(N), but the space complexity is now: O(2N) , since we are carrying two arrays leftMax and rightMax.


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


**Solution 2:**
-> Now we can optimize this further by following a two pointer approach.
-> Following that, we can bring the space complexity to O(1) and time complexity stays at O(N)


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


**Solution one:**

    function calculateTrappedRainwater(height) {
        const n = height.length;
        const ps = new Array(n).fill(0);
        const ss = new Array(n).fill(0);

          ps[0] = height[0];
          ss[n - 1] = height[n - 1];

          for (let i = 1; i < n; i++) {
            ps[i] = Math.max(ps[i - 1], height[i]);
          }
        
          for (let i = n - 2; i >= 0; i--) {
            ss[i] = Math.max(ss[i + 1], height[i]);
          }
        
          let ans = 0;
          for (let i = 1; i < n - 1; i++) {
            ans += Math.max(0, Math.min(ps[i - 1], ss[i + 1]) - height[i]);
          }
        
          return ans;
        }


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



**Solution two:**

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

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



HTML, CSS and Javascript:

I don't have a great understanding of HTML and CSS. But I have tried my best to improvise with the UI. 

But I can surely rely on the functionality and I am confident about the logic as the amount of water trapped will always comeout to be correct.
