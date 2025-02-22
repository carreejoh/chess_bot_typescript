import React, { Dispatch, SetStateAction } from 'react';

interface ControlsProps {
    speed: number,
    setSpeed: Dispatch<SetStateAction<number>>,
    showBars: boolean,
    setShowBars: Dispatch<SetStateAction<boolean>>,
    allowVisualToBeChanged: boolean,
    inputArrayLength: number,
    setInputArrayLength: Dispatch<SetStateAction<number>>,
    maxLength: number,
    randomize: () => void
}

const Controls: React.FC<ControlsProps> = ({
    speed,
    setSpeed,
    showBars,
    setShowBars,
    allowVisualToBeChanged,
    inputArrayLength,
    setInputArrayLength,
    maxLength,
    randomize
}) => {

    // Set speed of algorithim
    // Randomize button for numbers
    // Change length of starting array
    // Toggle between bar graph / lines

    return (
        <div className='w-full pt-1 pb-1 flex items-center'>
            {allowVisualToBeChanged && (
                <div className='mt-1 h-14 mr-4'>
                    <h2 className='text-sm text-gray-800'>Visualization type</h2>
                    <div className='flex items-center mt-0.5'>
                        <button onClick={() => setShowBars(true)} className={`${showBars ? "bg-blue-300 border-blue-400" : "bg-gray-200 border-gray-300"} border-[1px] text-sm p-0.5 pl-1.5 pr-2 rounded-md`}>
                            Bar Chart
                        </button>
                        <button onClick={() => setShowBars(false)} className={`${!showBars ? "bg-blue-300 border-blue-400" : "bg-gray-200 border-gray-300"} border-[1px] text-sm p-0.5 pl-1.5 pr-1.5 rounded-md ml-1`}>
                            Data Structure
                        </button>
                    </div>
                </div>
            )}
            <div className='mt-1 h-14 mr-4'>
                <h2 className='text-sm text-gray-800'>Sorting Speed</h2>
                <div className='flex items-center mt-0.5'>
                    <h3 className='text-sm mr-1'>0</h3>
                    <input onChange={(e) => setSpeed(Number(e.target.value))} type='range' min={0} max={2000} value={speed} step={100} />
                    <h3 className='text-sm ml-1'>2</h3>
                </div>
            </div>
            <div className='mt-1 h-14 mr-4'>
                <h2 className='text-sm text-gray-800'>Length of Array</h2>
                <div className='flex items-center mt-0.5'>
                    <h3 className='text-sm mr-1'>6</h3>
                    <input onChange={(e) => setInputArrayLength(Number(e.target.value))} type='range' min={6} max={maxLength} value={inputArrayLength} step={1} />
                    <h3 className='text-sm ml-1'>{maxLength}</h3>
                </div>
            </div>
            <div className='mt-1 h-14 mr-4'>
                <h2 className='text-sm text-gray-800'>Randomize</h2>
                <div className='flex items-center mt-0.5'>
                    <button onClick={() => randomize()} className={`bg-gray-200 border-gray-300 border-[1px] text-sm p-0.5 pl-1.5 pr-1.5 rounded-md ml-1`}>
                        Randomize
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Controls