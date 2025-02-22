
interface QuickSortVisualsProps {
    showBars: boolean,
    finished: boolean,
    arraysForVisual: number[][][],
    arrayToBeSorted: number[],
    pivotArray: number[]
}

const QuickSortVisuals: React.FC<QuickSortVisualsProps> = ({
    showBars,
    finished,
    arraysForVisual,
    arrayToBeSorted,
    pivotArray
}) => {

    return (
        <div>
            {!showBars && (
                <div className="min-h-48 flex flex-col items-center">
                    {arraysForVisual.map((subArray, index) => {
                        return (
                            <div key={index} className="h-6 flex items-center">
                                {subArray.map((array, index) => {

                                    return (
                                        <div key={index} className="flex items-center">
                                            {array.map((number, index) => {

                                                if (number === 999) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="w-5 h-5 ml-0.5 mr-0.5">
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`${(array.length === 1 && pivotArray.includes(number)) ? "bg-blue-600" : "bg-gray-800"} w-5 h-5 ml-0.5 mr-0.5 text-center mt-[8px]`}
                                                        >
                                                            <h2 className="text-white font-semibold text-[13px]">{number}</h2>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className="flex items-center h-6">
                        {finished && arrayToBeSorted.map((number, index) => (
                            <div
                                key={index}
                                className={`${(pivotArray.includes(number)) ? "bg-blue-600" : "bg-gray-800"} w-5 h-5 ml-0.5 mr-0.5 text-center mt-[8px]`}
                            >
                                <h2 className="text-white font-semibold text-[13px]">{number}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )

}

export default QuickSortVisuals