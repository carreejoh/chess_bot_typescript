import { useState, useEffect } from "react";
import { allPieceLegalMoves } from "../chessLogic/allAvailableMoves";

import Piece from "./pieces"

// What props the board is expecting,
interface BoardProps {
    whitePieces: { [key: string]: string };
    blackPieces: { [key: string]: string };
    castlingVariables: { [key: string]: boolean }
    handleBoardClick: (tile: string) => void;
    animations: { [key: string]: number },
    tileToBeAnimated: string,
    whitesTurn: boolean
}

function Board({
    whitePieces,
    blackPieces,
    castlingVariables,
    handleBoardClick,
    animations,
    tileToBeAnimated,
    whitesTurn
}: BoardProps) {

    // All legal moves, for both players
    const [allLegalMoves, setAllLegalMoves] = useState<{
        combinedLegalMoveArrayWhite: string[];
        combinedLegalMoveArrayBlack: string[];
        whitePiecesObject: { [key: string]: string[] };
        blackPiecesObject: { [key: string]: string[] };
      }>({
        combinedLegalMoveArrayWhite: [],
        combinedLegalMoveArrayBlack: [],
        whitePiecesObject: {},
        blackPiecesObject: {}
      });
    const [attacks, setAttacks] = useState<string[]>([])
    const [showAttacks, setShowAttacks] = useState("one")

    // Is either king in check
    const [isWhiteKingInCheck, setIsWhiteKingInCheck] = useState(false)
    const [isBlackKingInCheck, setIsBlackKingInCheck] = useState(false)

    // This logic builds the board 
    const allBoardSquares: string[] = [];
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    ranks.forEach((rank) => {
        files.forEach((file) => {
            allBoardSquares.push(`${file}${rank}`);
        });
    });

    // Find and set all legal moves state
    useEffect(() => {
        const legalMoves = allPieceLegalMoves(whitePieces, blackPieces, castlingVariables)
        setAllLegalMoves(legalMoves)
    }, [whitePieces, blackPieces, castlingVariables])

    // This shows all legal moves including attacks 
    useEffect(() => {
        if(!allLegalMoves) return
        if (showAttacks === "off") {
            setAttacks([])
        }
        if (whitesTurn && showAttacks === "one") {
            const noDups = [...new Set(allLegalMoves.combinedLegalMoveArrayWhite)];
            setAttacks(noDups)
        }
        if (!whitesTurn && showAttacks === "one") {
            const noDups = [...new Set(allLegalMoves.combinedLegalMoveArrayBlack)];
            setAttacks(noDups)
        }
        if (whitesTurn && showAttacks === "multiple") {
            setAttacks(allLegalMoves.combinedLegalMoveArrayWhite)
        }
        if (!whitesTurn && showAttacks === "multiple") {
            setAttacks(allLegalMoves.combinedLegalMoveArrayBlack)
        }
    }, [showAttacks, allLegalMoves, whitesTurn])

    // Check to see if either king is in check for UI
    useEffect(() => {
        if(!allLegalMoves) return

        if(allLegalMoves.combinedLegalMoveArrayWhite.includes(blackPieces.blackKing)) {
            setIsBlackKingInCheck(true)
        } 
        if(!allLegalMoves.combinedLegalMoveArrayWhite.includes(blackPieces.blackKing)) {
            setIsBlackKingInCheck(false)
        }
        if(allLegalMoves.combinedLegalMoveArrayBlack.includes(whitePieces.whiteKing)) {
            setIsWhiteKingInCheck(true)
        } 
        if(!allLegalMoves.combinedLegalMoveArrayBlack.includes(whitePieces.whiteKing)) {
            setIsWhiteKingInCheck(false)
        }  

    }, [allLegalMoves])

    return (
        <div className="w-[700px] h-[700px] chessboardBackground bg-gray-400 grid grid-cols-8 grid-rows-8 border-[4px] border-gray-700">
            {allBoardSquares.map((tile, index) => (
                <Piece
                    key={index}
                    index={index}
                    tile={tile}

                    whitePieces={whitePieces}
                    blackPieces={blackPieces}

                    handleBoardClick={handleBoardClick}

                    animations={animations}
                    tileToBeAnimated={tileToBeAnimated}

                    attacks={attacks}
                    isWhiteKingInCheck={isWhiteKingInCheck}
                    isBlackKingInCheck={isBlackKingInCheck}
                />
            ))}
        </div>
    )

}

export default Board