

import { useEffect, useState } from "react"
import Controls from "../components/controls";

function MergeSort() {


    // Array purely for visuals
    const [arraysForVisual, setArraysForVisual] = useState<number[][][]>([
        [[13, 14, 3, 11, 10, 12, 20, 6, 6, 16, 4, 5, 2, 7, 17, 8, 9, 15, 19, 1, 18, 22]]
    ]);
    // Array to be sorted by algorithm
    const [arrayToBeSorted, setArrayToBeSorted] = useState<number[][]>([[
        13, 14, 3, 11, 10, 12, 20, 6, 6, 16, 4, 5, 2, 7, 17, 8, 9, 15, 19, 1, 18, 22
    ]]);

    // State for controls
    const [speed, setSpeed] = useState(300)
    const [showBars, setShowBars] = useState(true)
    const [inputArrayLength, setInputArrayLength] = useState(20)

    // Randomly create an array based on value of inputArrayLength
    const randomize = () => {
        const arr = Array.from({ length: inputArrayLength }, (_, i) => i + 1);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        setArraysForVisual([[arr]])
        setArrayToBeSorted([arr])
    };

    useEffect(() => {
        randomize()
    }, [inputArrayLength, showBars])

    async function runAlgorithm() {

        let tempHolder = [...arrayToBeSorted];
        
        if(arraysForVisual.length > 1) {
            setArraysForVisual([tempHolder])
        }

        // Join the arrays together in order
        async function joinTogether() {

            if (tempHolder.length === 1) {
                setArrayToBeSorted(tempHolder)
                return
            }

            // For visualization
            await new Promise((resolve) => setTimeout(resolve, speed));
            setArraysForVisual(prev => [...prev, tempHolder])
            setArrayToBeSorted(tempHolder)

            const temp = []

            // Combine together two sub arrays at a time
            for (let i = 0; i < tempHolder.length; i += 2) {

                // If there's no other sub array to join with (odd number of arrays)
                if (!tempHolder[i + 1]) {
                    const noForwardNeighbor = tempHolder[i].sort((a, b) => a - b)
                    temp.push(noForwardNeighbor)
                    continue
                }

                const numArray1 = tempHolder[i]
                const numArray2 = tempHolder[i + 1]

                const combined = [numArray1, numArray2].flat().sort((a, b) => a - b)
                temp.push(combined)
            }
            tempHolder = temp


            joinTogether()
        }

        // Break down the array into smaller and smaller sub arrays
        async function recursive() {

            // For visualization 
            await new Promise((resolve) => setTimeout(resolve, speed));
            setArraysForVisual(prev => [...prev, tempHolder])
            setArrayToBeSorted(tempHolder)

            // Stop recursion when all subarrays have a length of 1
            if (tempHolder.every(subArray => subArray.length === 1)) {
                joinTogether()
                return;
            }

            // Temporary array that's filled in as sub arrays are divided
            const recursiveTemp: number[][] = [];

            // Loop through each sub-array and divide it in half
            for (const subArray of tempHolder) {
                if (subArray.length === 1) {
                    recursiveTemp.push(subArray);
                    continue;
                }

                const mid = Math.floor(subArray.length / 2);

                // Divide sub-array into two halves
                const left = subArray.slice(0, mid);
                const right = subArray.slice(mid);

                recursiveTemp.push(left);
                recursiveTemp.push(right);
            }

            tempHolder = recursiveTemp;
            recursive();
        }
        recursive();
    }


    return (
        <div className="w-[1356px] bg-white shadow-md rounded-md p-4 pt-3 mt-12">
            <h1 className="font-semibold text-lg">Merge Sort</h1>
            <Controls
                speed={speed}
                setSpeed={setSpeed}
                showBars={showBars}
                setShowBars={setShowBars}
                allowVisualToBeChanged={true}
                inputArrayLength={inputArrayLength}
                setInputArrayLength={setInputArrayLength}
                maxLength={30}
                randomize={randomize}
            />
            <button onClick={() => runAlgorithm()} className="bg-orange-500 text-gray-800 text-sm shadow-md font-semibold pl-2 pr-2 p-1 rounded-md mb-3">
                Run Algorithm
            </button>
            {!showBars && (
                <div className="min-h-48">
                    {arraysForVisual.map((masterArray, index) => (
                        <div key={index} className="h-8 w-full flex items-center justify-around">
                            {masterArray.map((subArray, index) => (
                                <div key={index} className="flex items-center">
                                    <h1 className="text-3xl">[</h1>
                                    {subArray.map((number, index) => (
                                        <div
                                            style={{}}
                                            className={`w-5 h-5 bg-gray-800 ml-0.5 mr-0.5 text-center mt-[8px]`}
                                            key={index}
                                        >
                                            <h2 className="text-white font-semibold text-[13px]">{number}</h2>
                                        </div>
                                    ))}
                                    <h1 className="text-3xl">]</h1>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>    
            )}
            {showBars && (
                <div className="flex items-end justify-center">
                    {arrayToBeSorted.map((subArray, index) => (
                        <div key={index} className="flex items-end ml-3 mr-3">
                            {subArray.map((number, index) => (
                                <div
                                    style={{ height: `${number * 10}px` }}
                                    className={`w-4 mr-1 bg-black`}
                                    key={index}
                                >
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MergeSort