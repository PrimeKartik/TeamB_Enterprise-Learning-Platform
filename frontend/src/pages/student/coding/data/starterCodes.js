export const STARTER_CODES = {
  javascript: `/**
 * Problem Solution in JavaScript (Node.js)
 * @param {any} input - Function input parameters
 * @return {any} - Function result
 */
function solution(input) {
    // Write your JavaScript code here
    console.log("Processing JavaScript solution...", input);
    return input;
}

// Example Execution
const result = solution([2, 7, 11, 15]);
console.log("Result:", result);`,

  java: `/**
 * Problem Solution in Java (JDK 21)
 */
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Write your Java code here
        System.out.println("Executing Java solution...");
        
        int[] nums = {2, 7, 11, 15};
        System.out.println("Input Array: " + Arrays.toString(nums));
    }
    
    public int solve(int[] nums, int target) {
        // Implementation logic
        return 0;
    }
}`,

  python: `""\"
Problem Solution in Python 3.11
""\"
import sys

def solution(nums, target):
    # Write your Python solution code here
    print("Processing Python solution with nums:", nums)
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

if __name__ == "__main__":
    test_nums = [2, 7, 11, 15]
    result = solution(test_nums, 9)
    print("Python Output Result:", result)`,

  sql: `-- Problem Solution in MySQL 8.0
-- Write your SQL Query below to query the database tables

SELECT 
    e.id AS employee_id,
    e.name AS employee_name,
    d.department_name,
    e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 50000
ORDER BY e.salary DESC;`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HTML5 & CSS3 Practice Workspace</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .card {
            background: linear-gradient(135deg, #7c3aed, #ec4899);
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>SkillSphere Web Practice</h1>
        <p>Edit HTML & CSS to build dynamic UI components.</p>
    </div>
</body>
</html>`,

  cpp: `/**
 * Problem Solution in C++ (GCC 13)
 */
#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

int main() {
    // Write your C++ code here
    cout << "Executing C++ Solution..." << endl;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    cout << "Array size: " << nums.size() << endl;
    return 0;
}`,

  c: `/**
 * Problem Solution in C (GCC 13)
 */
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Write your C code here
    printf("Executing C Solution...\n");
    int nums[] = {2, 7, 11, 15};
    int n = sizeof(nums) / sizeof(nums[0]);
    printf("Number of elements: %d\n", n);
    return 0;
}`
};

export default STARTER_CODES;
