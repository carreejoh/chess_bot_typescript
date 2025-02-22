import { useState } from "react"

function BubbleSort() {

    const [indexesBeingCompared, setIndexesBeingCompared] = useState<number[]>([]);
    const [arrayToBeSorted, setArrayToBeSorted] = useState<number[]>([
      13, 14, 3, 11, 10, 12, 20, 6, 6, 16, 4, 5, 2, 7, 17, 8, 9, 15, 19, 1, 18,
    ]);
    
    async function runAlgorithm() {
        // Make a copy of the array to sort
        const arr = [...arrayToBeSorted];
        const n = arr.length;
      
        // Outer loop for Bubble Sort passes
        for (let i = 0; i < n - 1; i++) {
          // Each pass, the largest element "bubbles" to the end.
          for (let j = 0; j < n - 1 - i; j++) {
            // Highlight the two indexes being compared
            setIndexesBeingCompared([j, j + 1]);
      
            // Wait for a short duration (e.g., 100ms) to visualize the comparison
            await new Promise((resolve) => setTimeout(resolve, 50));
      
            // Swap if elements are out of order
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              // Update state to reflect the swap visually
              setArrayToBeSorted([...arr]);
            }
          }
        }
      
        // Clear the highlighted indexes when sorting is complete
        setIndexesBeingCompared([]);
      }
      
    

    return (
        <div className="w-[1360px] h- bg-white shadow-md p-4">

            <div className="flex items-end">
                {arrayToBeSorted.map((number, index) => (
                    <div
                        style={{ height: `${number * 10}px` }}
                        className={`w-4 mr-1 ${indexesBeingCompared.includes(index) ? "bg-blue-200" : "bg-black"}`}
                        key={index}
                    >
                    </div>
                ))}
            </div>

            <button onClick={() => runAlgorithm()} className="mt-2">
                Run Algorithm
            </button>

        </div>
    )
}

export default BubbleSort