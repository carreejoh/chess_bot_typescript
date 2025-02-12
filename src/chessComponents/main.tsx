import { useState } from "react"
import { initialWhitePieces, initialBlackPieces } from "../other/chessLocations.ts"
import { isThatValidMove } from "../chessLogic/isThatValidMove.ts"
import { isThisCastling, rebuildCastlingVariables, rebuildCastlingVariablesWithoutCastling } from "../chessLogic/castling.ts"
import { convertTileLocationToPiecename } from "../other/conversionFunctions.ts"
import { calculateAnimations } from "../other/calculateAnimations.ts"

import Board from "./board"

function Main() {

    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)
    const [whitesTurn, setWhitesTurn] = useState(true)

    // The last tile that was clicked
    const [lastClickedSquare, setLastClickedSquare] = useState("")

    // Animations
    const [tileToBeAnimated, setTileToBeAnimated] = useState("")
    const [animations, setAnimations] = useState({
        dx: 0,
        dy: 0
    })


    // Variables for castling
    const [castlingVariables, setCastlingVariables] = useState({
        hasWhiteKingBeenMoved: false,
        hasBlackKingBeenMoved: false,
        hasWhiteRookOneBeenMoved: false,
        hasWhiteRookTwoBeenMoved: false,
        hasBlackRookOneBeenMoved: false,
        hasBlackRookTwoBeenMoved: false
    })


    // This calculates the animations for the piece to be moved
    const handleAnimations = (tile: string, currentTile: string) => {
        if (tileToBeAnimated !== "") return;
        const animationAngles = calculateAnimations(currentTile, tile);
        setTileToBeAnimated(currentTile);
        setAnimations(animationAngles);
    };


    // Change castling variables,
    // Moves pieces in other function
    const handleCastling = (moveToTile: string) => {
        let castling = rebuildCastlingVariables(moveToTile, castlingVariables, whitePieces, blackPieces)
        setCastlingVariables(castling.castleVariablesClone)
        setWhitePieces(castling.whitePiecesClone)
        setBlackPieces(castling.blackPiecesClone)
        setWhitesTurn(!whitesTurn)
    }


    // Change the location of either players piece
    // If the piece is a rook, or king, set that piece to false in castlingVariables
    const changePiecePosition = (moveToTile: string, currentTile: string) => {
        let piece = convertTileLocationToPiecename(currentTile, whitePieces, blackPieces)
        if (whitesTurn) {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [piece]: moveToTile,
            }));
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [piece]: moveToTile,
            }));
        }
        // Check to see if a rook or king as been moved and set those variables to true
        let accountForRookKingMovement = rebuildCastlingVariablesWithoutCastling(piece, castlingVariables)
        setCastlingVariables(accountForRookKingMovement)
    }


    // Set either players piece to "na" based on tile
    const handleCapture = (tile: string) => {
        let piece = convertTileLocationToPiecename(tile, whitePieces, blackPieces)
        if (!piece) return
        if (!whitesTurn) {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [piece]: "na",
            }));
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [piece]: "na",
            }));
        }
    }


    // Verify the user is attempting a legal move
    // If indeed legal move, handle any captures, and change the position
    const verifyAndMovePiece = (moveToTile: string, currentTile: string) => {

        // Verify that move is legal 
        let validMove = isThatValidMove(whitePieces, blackPieces, castlingVariables, moveToTile, currentTile)
        if (!validMove) return

        // Check if this is a castling attempt
        let castling = isThisCastling(whitePieces, blackPieces, moveToTile, currentTile)
        if (castling) {
            handleCastling(moveToTile)
            return
        }

        if (validMove) {
            handleAnimations(moveToTile, currentTile)
            // Board logic
            // Delay by 150 ms for animations
            setTimeout(() => {
                handleCapture(moveToTile)
                changePiecePosition(moveToTile, currentTile)
                setWhitesTurn(!whitesTurn)
            }, 150)
            setTimeout(() => {
                setTileToBeAnimated("");
                setAnimations({
                    dx: 0,
                    dy: 0
                });
            }, 170);
        }
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
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <Board
                whitePieces={whitePieces}
                blackPieces={blackPieces}
                castlingVariables={castlingVariables}

                handleBoardClick={handleBoardClick}

                animations={animations}
                tileToBeAnimated={tileToBeAnimated}

                whitesTurn={whitesTurn}
            />
        </div>
    )

}

export default Main