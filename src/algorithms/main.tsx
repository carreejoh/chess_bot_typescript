
import BubbleSort from "./algorithms/bubbleSort"
import MergeSort from "./algorithms/mergeSort"

function AlgorithmsMain() {
    
    return(
        <div className="w-full h-full overflow-y-scroll bg-gray-200 grid grid-cols-12 pl-72 pr-72 pt-36">

        <BubbleSort/>
        <MergeSort/>

        </div>

    )
}

export default AlgorithmsMain