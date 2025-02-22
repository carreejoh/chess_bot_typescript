

import { useEffect, useState } from "react"
import Controls from "../components/controls";
import QuickSortVisuals from "./components/quickSortVisuals";

function QuickSort() {


    // Arrays purely for visuals
    const [pivotArray, setPivotArray] = useState<number[]>([])
    const [finished, setFinished] = useState(false)

    const [arraysForVisual, setArraysForVisual] = useState<number[][][]>([
        [[13, 14, 3, 11, 10, 12, 20, 6, 6, 16, 4, 5, 2, 7, 17, 8, 9, 15, 19, 1, 18, 22]]
    ]);
    // Array to be sorted by algorithm
    const [arrayToBeSorted, setArrayToBeSorted] = useState<number[]>([
        13, 14, 3, 11, 10, 12, 27, 6, 6, 16, 32, 5, 2, 7, 17, 8, 9, 15, 19, 1, 37, 22
    ]);

    // State for controls
    const [speed, setSpeed] = useState(300)
    const [showBars, setShowBars] = useState(false)
    const [inputArrayLength, setInputArrayLength] = useState(20)

    // Randomly create an array based on value of inputArrayLength
    const randomize = () => {
        setFinished(false)
        const arr = Array.from({ length: inputArrayLength }, (_, i) => i + 1);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setArraysForVisual([[arr]])
        setArrayToBeSorted(arr)
    };

    // Create new starting array when settings are switched
    useEffect(() => {
        randomize()
    }, [inputArrayLength, showBars])

    // Holds the sorting algorithm
    async function runAlgorithm() {

        setFinished(false)
        const startingArray = [...arrayToBeSorted];

        if (arraysForVisual.length > 1) {
            setArraysForVisual([[startingArray]])
        }

        async function quickSort(array: number[]): Promise<number[]> {

            // Base case: arrays with 0 or 1 element are already sorted
            if (array.length <= 1) return array;
            
            // For visuals
            await new Promise((resolve) => setTimeout(resolve, speed));

            // Choose a pivot index at random and retrieve the pivot value
            const pivotIndex = Math.floor(Math.random() * array.length);
            const pivot = array[pivotIndex];


            // Create arrays for values less than (or equal to) and greater than the pivot
            const left: number[] = [];
            const right: number[] = [];

            // Partition the array, skipping the pivot itself
            for (let i = 0; i < array.length; i++) {
                if (i === pivotIndex) continue;
                if (array[i] <= pivot) {
                    left.push(array[i]);
                } else {
                    right.push(array[i]);
                }
            }

            // For visuals
            createVisualStructure(pivot, left, right)

            // Recursively sort the left and right partitions and combine them with the pivot
            return [...await quickSort(left), pivot, ...await quickSort(right)];
        }

        const sortedArray = await quickSort(startingArray);
        setArrayToBeSorted(sortedArray)
        setFinished(true)
    }

    // Create a structure that can be easily mapped for viewing
    function createVisualStructure(pivot: number, left: number[], right: number[]) {

        // update pivot array, use old one to guarantee new num is added
        const oldPivotArray = [...pivotArray]
        setPivotArray(prev => [...prev, pivot])
        oldPivotArray.push(pivot)

        // Make new array for that step with left right and pivot
        const newArray = [left, [pivot], right]
        const flatNewArray = newArray.flat()

        // Get largest and smallest values from new array including pivot
        const largest = Math.max(...flatNewArray);
        const smallest = Math.min(...flatNewArray);

        const differenceRight = inputArrayLength - largest
        const differenceLeft = smallest - 1

        const fillerRight = Array(differenceRight).fill(999)
        const fillerLeft = Array(differenceLeft).fill(999)

        newArray.push(fillerRight)
        newArray.unshift(fillerLeft)

        setArraysForVisual(prev => [...prev, newArray])
    }

    return (
        <div className="w-[1360px] bg-white shadow-md rounded-md p-4 pt-3 mt-12">
            <h1 className="font-semibold text-lg">Quick Sort</h1>
            <Controls
                speed={speed}
                setSpeed={setSpeed}
                showBars={showBars}
                setShowBars={setShowBars}
                allowVisualToBeChanged={false}
                inputArrayLength={inputArrayLength}
                setInputArrayLength={setInputArrayLength}
                maxLength={30}
                randomize={randomize}
            />
            <button onClick={() => runAlgorithm()} className="bg-orange-500 text-gray-800 text-sm shadow-md font-semibold pl-2 pr-2 p-1 rounded-md mb-3">
                Run Algorithm
            </button>
            <QuickSortVisuals
                showBars={showBars}
                finished={finished}
                arraysForVisual={arraysForVisual}
                arrayToBeSorted={arrayToBeSorted}
                pivotArray={pivotArray}
            />
        </div>
    )
}

export default QuickSort