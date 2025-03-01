import { useState, useEffect } from "react"
import { initialWhitePieces, initialBlackPieces } from "./other/chessLocations.ts"
import { isThatValidMove } from "./chessLogic/isThatValidMove.ts"
import { isThisCastling, rebuildCastlingVariables, rebuildCastlingVariablesWithoutCastling } from "./chessLogic/castling.ts"
import { convertTileLocationToPiecename } from "./other/conversionFunctions.ts"
import { calculateAnimations } from "./other/calculateAnimations.ts"
import { isThisAPromotion, rebuildLocationsWithPromotion } from "./chessLogic/promotion.ts"
// import { botOne } from "./bots/botOne.ts"


import Board from "./chessComponents/board.tsx"
import Promotion from "./chessComponents/promotion.tsx"

function Main() {

    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)
    const [whitesTurn, setWhitesTurn] = useState(true)

    const [showPromotion, setShowPromotion] = useState("na")
    // const [promotionPawn, setPromotionPawn] = useState("")

    // The last tile that was clicked
    const [lastClickedSquare, setLastClickedSquare] = useState("")

    // Animations
    const [tileToBeAnimated, setTileToBeAnimated] = useState("")
    const [animations, setAnimations] = useState({
        dx: 0,
        dy: 0
    })

    // // Bot implementation
    // useEffect(() => {
    //     if (!whitesTurn) {
    //         setTileToBeAnimated("");
    //         setAnimations({
    //             dx: 0,
    //             dy: 0
    //         });
    //         setTimeout(() => {
    //             let bot = botOne(whitePieces, blackPieces, castlingVariables)
    //             console.log(bot)
    //             verifyAndMovePiece(bot.moveToTile, bot.originalTile)
    //         }, 200)
    //     }
    // }, [whitesTurn])

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


    // Move piece, show selection modal
    const handlePromotion = (moveToTile: string) => {
        // Show the modal allowing user to select piece
        setShowPromotion(moveToTile)
        changePiecePosition(moveToTile, lastClickedSquare)
    }

    // 
    const handlePromotionSelection = (selection: string) => {
        // Get the pawn being promoted
        const piece = convertTileLocationToPiecename(lastClickedSquare, whitePieces, blackPieces)
        // Rebuild the white and black location objects with new promoted piece
        const rebuilt = rebuildLocationsWithPromotion(whitePieces, blackPieces, piece, selection)
        setWhitePieces(rebuilt.whiteClone)
        setBlackPieces(rebuilt.blackClone)
        setShowPromotion("na")
        setWhitesTurn(!whitesTurn)
    }


    // Change castling variables,
    // Moves pieces in other function
    const handleCastling = (moveToTile: string) => {
        const castling = rebuildCastlingVariables(moveToTile, castlingVariables, whitePieces, blackPieces)
        setCastlingVariables(castling.castleVariablesClone)
        setWhitePieces(castling.whitePiecesClone)
        setBlackPieces(castling.blackPiecesClone)
        setWhitesTurn(!whitesTurn)
    }


    // Change the location of either players piece
    // If the piece is a rook, or king, set that piece to false in castlingVariables
    const changePiecePosition = (moveToTile: string, currentTile: string) => {
        const piece = convertTileLocationToPiecename(currentTile, whitePieces, blackPieces)
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
        const accountForRookKingMovement = rebuildCastlingVariablesWithoutCastling(piece, castlingVariables)
        setCastlingVariables(accountForRookKingMovement)
    }


    // Set either players piece to "na" based on tile
    const handleCapture = (tile: string) => {
        const piece = convertTileLocationToPiecename(tile, whitePieces, blackPieces)
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

        const piece = convertTileLocationToPiecename(currentTile, whitePieces, blackPieces)

        // Verify that move is legal 
        const validMove = isThatValidMove(whitePieces, blackPieces, castlingVariables, moveToTile, currentTile)
        if (!validMove) return

        // Check if this is a castling attempt
        const castling = isThisCastling(whitePieces, blackPieces, moveToTile, currentTile)
        if (castling) {
            handleCastling(moveToTile)
            return
        }

        // Check to see if this is a promotion
        const accountForPromotions = isThisAPromotion(piece, moveToTile)
        if (accountForPromotions) {
            handlePromotion(moveToTile)
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
            <div className="w-[700px] h-[700px] relative">
                {showPromotion !== "na" && (
                    <Promotion
                        showPromotion={showPromotion}
                        handlePromotionSelection={handlePromotionSelection}
                    />
                )}
                {/* disable users from pressing anything until their piece is promoted */}
                {showPromotion !== "na" && (
                    <div className="absolute w-full h-full bg-black opacity-10">
                    </div>    
                )}
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
        </div>
    )

}

export default Main