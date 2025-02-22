
import BubbleSort from "./algorithms/bubbleSort"
import MergeSort from "./algorithms/mergeSort"

function AlgorithmsMain() {
    
    return(
        <div className="w-full h-full overflow-y-scroll bg-gray-200 flex flex-col items-center pt-36 pb-72">

        <BubbleSort/>
        <MergeSort/>

        </div>

    )
}

export default AlgorithmsMain