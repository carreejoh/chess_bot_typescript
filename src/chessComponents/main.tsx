import { useState } from "react"
import { initialWhitePieces, initialBlackPieces } from "../other/chessLocations.ts"

import Board from "./board"

function Main() {

    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)

    return(
        <div className="w-[100vw] h-[100vh] bg-gray-200 flex items-center justify-center">
            <Board
                whitePieces={whitePieces}
                blackPieces={blackPieces}
            />
        </div>
    )

}

export default Main