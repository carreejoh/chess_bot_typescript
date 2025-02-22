

import { useState } from "react"

function MergeSort() {

    const [arraysForVisual, setArraysForVisual] = useState<number[][][]>([
        [[13, 14, 3, 11, 10, 12, 20, 6, 6, 16, 4, 5, 2, 7, 17, 8, 9, 15, 19, 1, 18, 22]]
    ]);
    const [arrayToBeSorted, setArrayToBeSorted] = useState<number[]>([
        13, 14, 3, 11, 10, 12, 20, 6, 6, 16, 4, 5, 2, 7, 17, 8, 9, 15, 19, 1, 18, 22
    ]);

    async function runAlgorithm() {

        setArraysForVisual([[[13, 14, 3, 11, 10, 12, 20, 6, 6, 16, 4, 5, 2, 7, 17, 8, 9, 15, 19, 1, 18, 22]]])
        setArrayToBeSorted([13, 14, 3, 11, 10, 12, 20, 6, 6, 16, 4, 5, 2, 7, 17, 8, 9, 15, 19, 1, 18, 22])

        let tempHolder = [[...arrayToBeSorted]];

        // Join the arrays together in order
        async function joinTogether() {
            
            if (tempHolder.length === 1) {
                setArrayToBeSorted(tempHolder[0])
                return
            }
            
            await new Promise((resolve) => setTimeout(resolve, 200));
            setArraysForVisual(prev => [...prev, tempHolder])


            let temp = []

            // Combine together two sub arrays at a time
            for (let i = 0; i < tempHolder.length; i += 2) {

                // If there's no other sub array to join with (odd number of arrays)
                if (!tempHolder[i + 1]) {
                    let noForwardNeighbor = tempHolder[i].sort((a, b) => a - b)
                    temp.push(noForwardNeighbor)
                    continue
                }

                let numArray1 = tempHolder[i]
                let numArray2 = tempHolder[i + 1]

                let combined = [numArray1, numArray2].flat().sort((a, b) => a - b)
                temp.push(combined)
            }
            tempHolder = temp


            joinTogether()
        }

        // Break down the array into smaller and smaller sub arrays
        async function recursive() {

            // For visualization 
            await new Promise((resolve) => setTimeout(resolve, 200));
            setArraysForVisual(prev => [...prev, tempHolder])

            // Stop recursion when all subarrays have a length of 1
            if (tempHolder.every(subArray => subArray.length === 1)) {
                joinTogether()
                return;
            }

            // Temporary array that's filled in as sub arrays are divided
            let recursiveTemp: number[][] = [];

            // Loop through each sub-array and divide it in half
            for (let subArray of tempHolder) {
                if (subArray.length === 1) {
                    recursiveTemp.push(subArray);
                    continue;
                }

                let mid = Math.floor(subArray.length / 2);

                // Divide sub-array into two halves
                let left = subArray.slice(0, mid);
                let right = subArray.slice(mid);

                recursiveTemp.push(left);
                recursiveTemp.push(right);
            }

            tempHolder = recursiveTemp;


            recursive();
        }

        recursive();
    }


    return (
        <div className="col-span-12 bg-white shadow-md p-4 mt-12">
            {arraysForVisual.map((masterArray, index) => (
                <div key={index} className="h-12 w-full flex items-center justify-around">
                    {masterArray.map((subArray, index) => (
                        <div key={index} className="flex items-center">
                            <h1 className="text-5xl">[</h1>
                            {subArray.map((number, index) => (
                                <div
                                    style={{}}
                                    className={`w-6 h-6 bg-black mr-1 text-center mt-[14px]`}
                                    key={index}
                                >
                                    <h2 className="text-white font-semibold">{number}</h2>
                                </div>
                            ))}
                            <h1 className="text-5xl">]</h1>
                        </div>
                    ))}
                </div>
            ))}

            <button onClick={() => runAlgorithm()} className="mt-2">
                Run Algorithm
            </button>

        </div>
    )
}

export default MergeSort