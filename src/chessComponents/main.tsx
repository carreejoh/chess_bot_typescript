import { useState } from "react"
import { initialWhitePieces, initialBlackPieces } from "../other/chessLocations.ts"

import Board from "./board"

function Main() {

    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)
    const [whitesTurn, setWhitesTurn] = useState(true)

    // The last tile that was clicked
    const [lastClickedSquare, setLastClickedSquare] = useState("")

    // Variables for castling
    const [castlingVariables, setCastlingVariables] = useState({
        hasWhiteKingBeenMoved: false,
        hasBlackKingBeenMoved: false,
        hasWhiteRookOneBeenMoved: false,
        hasWhiteRookTwoBeenMoved: false,
        hasBlackRookOneBeenMoved: false,
        hasBlackRookTwoBeenMoved: false
    })
    

    // Verify the user is attempting a legal move
    // If indeed legal move, handle any captures, and change the position
    const verifyAndMovePiece = (moveToTile: string, currentTile: string) => {
        console.log(moveToTile)
        console.log(currentTile)
    }


    // Simple logic to determine what the player was trying to do
    // if they click the board
    const handleBoardClick = (tile: string) => {

        // Get positions of both player's pieces
        const whitePieceLocations = Object.values(whitePieces);
        const blackPieceLocations = Object.values(blackPieces);

        // White player is trying to move piece
        if (whitesTurn && whitePieceLocations.includes(lastClickedSquare) && !whitePieceLocations.includes(tile)) {
            verifyAndMovePiece(tile, lastClickedSquare)
        }

        // Black player is trying to move piece
        if (!whitesTurn && blackPieceLocations.includes(lastClickedSquare) && !blackPieceLocations.includes(tile)) {
            verifyAndMovePiece(tile, lastClickedSquare)
        }

        // Set the last clicked square as the tile
        setLastClickedSquare(tile)
    }


    return (
        <div className="w-[100vw] h-[100vh] bg-gray-200 flex items-center justify-center">
            <Board
                whitePieces={whitePieces}
                blackPieces={blackPieces}

                handleBoardClick={handleBoardClick}
            />
        </div>
    )

}

export default Main