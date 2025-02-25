
import MergeSort from "./algorithms/mergeSort"
import QuickSort from "./algorithms/quickSort"
import GameOfLife from "./algorithms/gameOfLife"
import BreadthFirstSearch from "./algorithms/breadthFirstSearch"

function AlgorithmsMain() {
    
    return(
        <div className="w-full h-full overflow-y-scroll bg-gray-200 flex flex-col items-center pt-36 pb-72">

        {/* <BubbleSort/> */}
        <MergeSort/>
        <QuickSort/>
        <BreadthFirstSearch/>
        <GameOfLife/>

        </div>

    )
}

export default AlgorithmsMain