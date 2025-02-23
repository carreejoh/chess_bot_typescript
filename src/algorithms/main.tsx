
import BubbleSort from "./algorithms/bubbleSort"
import MergeSort from "./algorithms/mergeSort"
import QuickSort from "./algorithms/quickSort"
import GameOfLife from "./algorithms/gameOfLife"

function AlgorithmsMain() {
    
    return(
        <div className="w-full h-full overflow-y-scroll bg-gray-200 flex flex-col items-center pt-36 pb-72">

        {/* <BubbleSort/> */}
        <MergeSort/>
        <QuickSort/>
        <GameOfLife/>

        </div>

    )
}

export default AlgorithmsMain