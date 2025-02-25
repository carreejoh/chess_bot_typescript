import { useState } from "react"
import { createGridForMaze } from "./helpers/makeBinaryGrid"

const BreadthFirstSearch: React.FC = () => {

    const [grid, setGrid] = useState<number[][]>(createGridForMaze(36, 100));
    const [visited, setVisted] = useState<string[]>([])
    const [seen, setSeen] = useState<string[]>([])

    const [functionHasStarted, setFunctionHasStarted] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false);

    function addOrRemoveStartingTile(rowIndex: number, columnIndex: number) {

        if (functionHasStarted) return

        // Can't remove walls
        if (rowIndex === 0 || rowIndex === 35) return
        if (columnIndex === 0 || columnIndex === 99) return
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            newGrid[rowIndex][columnIndex] = newGrid[rowIndex][columnIndex] === 0 ? 1 : 0;
            return newGrid;
        });
    }

    async function runAlgorithm() {
        setFunctionHasStarted(true)

        // Store which values have been visited
        const visited = new Set<string>()
        // Store unexplored paths in order of finding them
        const notExploredYet = new Set<string>()

        // Entrance coords
        const start = "0,1"

        // Check all 8 nodes around coords
        function checkNeighbors(columnIndex: number, rowIndex: number) {
            const up = grid[rowIndex - 1]?.[columnIndex];
            const upRight = grid[rowIndex - 1]?.[columnIndex + 1];
            const right = grid[rowIndex]?.[columnIndex + 1];
            const downRight = grid[rowIndex + 1]?.[columnIndex + 1];
            const down = grid[rowIndex + 1]?.[columnIndex];
            const downLeft = grid[rowIndex + 1]?.[columnIndex - 1];
            const left = grid[rowIndex]?.[columnIndex - 1];
            const upLeft = grid[rowIndex - 1]?.[columnIndex - 1];
            return [up, upRight, right, downRight, down, downLeft, left, upLeft];
        }

        // Assist the recursion function
        const locationValues = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]

        async function recursion(nodeToBeExplored: string) {

            // Mark this as being visited
            visited.add(nodeToBeExplored)

            // Remove it from not explored
            notExploredYet.delete(nodeToBeExplored)

            const currentNodeRow = Number(nodeToBeExplored.split(",")[0])
            const currentNodeColumn = Number(nodeToBeExplored.split(",")[1])

            // Get neighbors status
            const neighbors = checkNeighbors(currentNodeColumn, currentNodeRow)

            for (let i = 0; i < neighbors.length; i++) {
                // Out of boundaries
                if (neighbors[i] === undefined) continue

                // Find all neighbors locations
                const neighborLocationRow = currentNodeRow + locationValues[i][0]
                const neighborLocationColumn = currentNodeColumn + locationValues[i][1]

                // This node is a wall
                if (grid[neighborLocationRow][neighborLocationColumn] === 1) continue

                // This node has been visited before
                if (visited.has(`${neighborLocationRow},${neighborLocationColumn}`)) continue


                notExploredYet.add(`${neighborLocationRow},${neighborLocationColumn}`)
            }

            // For visuals
            await new Promise((resolve) => setTimeout(resolve, 10));

            const notExplored = Array.from(notExploredYet);
            setSeen(notExplored)
            const visitedArray = Array.from(visited);
            setVisted(visitedArray)

            // Oldest unexplored node
            const firstElementInSet = [...notExploredYet][0];

            // End loop if finished
            if (firstElementInSet === undefined) {
                return
            } else {
                recursion(firstElementInSet)
            }
        }

        recursion(start)
    }

    return (
        <div className="w-[1356px] bg-white shadow-md rounded-md p-4 pt-3 mt-12">
            <h1 className="font-semibold text-lg">Breadth First Search</h1>
            <button onClick={() => runAlgorithm()} className="bg-orange-500 text-gray-800 text-sm shadow-md font-semibold pl-2 pr-2 p-1 rounded-md mb-3 mt-2">
                Run Algorithm
            </button>
            <div
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
                onMouseLeave={() => setIsMouseDown(false)}
                className="w-full h-[508px] border-[0px] border-gray-400"
            >
                {grid.map((row, rowIndex) => (
                    <div className="flex" key={rowIndex}>
                        {row.map((square, columnIndex) => {

                            const stringNode = `${rowIndex},${columnIndex}`

                            const divClasses = () => {
                                if (square === 1) {
                                    return ("bg-gray-400")
                                }
                                if (visited.includes(stringNode)) {
                                    return ("bg-orange-600")
                                }
                                if (seen.includes(stringNode)) {
                                    return ("bg-orange-200")
                                }
                                return "bg-black"
                            }

                            const color = divClasses()

                            return (
                                <div
                                    onMouseDown={() => addOrRemoveStartingTile(rowIndex, columnIndex)}
                                    onMouseEnter={() => {
                                        if (isMouseDown) {
                                            addOrRemoveStartingTile(rowIndex, columnIndex);
                                        }
                                    }}
                                    key={columnIndex}
                                    className={`w-[20px] h-[14px] ${color}`}
                                >

                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BreadthFirstSearch