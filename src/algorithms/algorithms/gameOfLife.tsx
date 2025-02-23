import { useState } from "react";
import { getGrid } from "./helpers/gameOfLife";

function GameOfLife() {

    const [grid, setGrid] = useState<number[][]>(getGrid());
    const [functionHasStarted, setFunctionHasStarted] = useState(false)

    // This allows users to set their own starting tiles
    function addOrRemoveStartingTile(rowIndex: number, columnIndex: number) {
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          newGrid[rowIndex][columnIndex] = newGrid[rowIndex][columnIndex] === 0 ? 1 : 0;
          return newGrid;
        });
      }
      


    async function runAlgorithm() {
        setFunctionHasStarted(true)

        // Create a deep copy of the current grid and set the starting live cells.
        let newGrid = grid.map(row => [...row]);

        // Immediately update state with the starting configuration.
        setGrid(newGrid);

        // Use a helper that accepts a grid as an argument.
        function checkNeighbors(columnIndex: number, rowIndex: number, currentGrid: number[][]) {
            const up = currentGrid[rowIndex - 1]?.[columnIndex];
            const upRight = currentGrid[rowIndex - 1]?.[columnIndex + 1];
            const right = currentGrid[rowIndex]?.[columnIndex + 1];
            const downRight = currentGrid[rowIndex + 1]?.[columnIndex + 1];
            const down = currentGrid[rowIndex + 1]?.[columnIndex];
            const downLeft = currentGrid[rowIndex + 1]?.[columnIndex - 1];
            const left = currentGrid[rowIndex]?.[columnIndex - 1];
            const upLeft = currentGrid[rowIndex - 1]?.[columnIndex - 1];

            return [up, upRight, right, downRight, down, downLeft, left, upLeft];
        }

        function updateGameOfLife(currentGrid: number[][]): number[][] {
            // Create a new copy for the next generation.
            const nextGrid = currentGrid.map(row => [...row]);
            currentGrid.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    const neighbors = checkNeighbors(columnIndex, rowIndex, currentGrid);
                    const aliveNeighbors = neighbors.filter(n => n === 1).length;

                    // Underpopulation or Overpopulation: live cell dies.
                    if (cell === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                        nextGrid[rowIndex][columnIndex] = 0;
                    }
                    // Reproduction: dead cell becomes alive.
                    else if (cell === 0 && aliveNeighbors === 3) {
                        nextGrid[rowIndex][columnIndex] = 1;
                    }
                    // Otherwise, the cell stays the same.
                });
            });
            return nextGrid;
        }

        // Update once using the current newGrid. 
        newGrid = updateGameOfLife(newGrid);
        setGrid(newGrid);

        // Manually control time between function calls
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 0; i < 200; i++) {
            await sleep(200)
            newGrid = updateGameOfLife(newGrid)
            setGrid(newGrid)
            if(i === 199) {
                setFunctionHasStarted(false)
            }
        }
    }



    return (
        <div className="w-[1360px] bg-white shadow-md rounded-md p-4 pt-3 mt-12">
            <h1 className="font-semibold text-lg">Conway's Game of Life</h1>
            <button onClick={() => runAlgorithm()} className="bg-orange-500 text-gray-800 text-sm shadow-md font-semibold pl-2 pr-2 p-1 rounded-md mb-3 mt-2">
                Run Algorithm
            </button>
            <div className="w-full h-[500px] border-[2px] border-gray-400">
                {grid.map((row, rowIndex) => (
                    <div className="flex" key={rowIndex}>
                        {row.map((square, columnIndex) => (
                            <div onClick={!functionHasStarted ? () => addOrRemoveStartingTile(rowIndex, columnIndex) : undefined} key={columnIndex} className={`w-[20px] h-[14px] ${square === 0 ? "bg-black" : "bg-white"}`}>

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameOfLife