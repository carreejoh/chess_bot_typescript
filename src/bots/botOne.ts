
import { allPieceLegalMoves } from "../chessLogic/allAvailableMoves"
import { pieceTypeToValue, variableNamesToPieceType } from "../other/referenceObjects"
import { whatCanAllPiecesSee } from "../chessLogic/whatCanAllPiecesSee"

// What will this bot need to be able to choose/play a move?

// 1.0
// All legal moves with all pieces
// All legal captures with all pieces

// Inputs
// White locations, black locations

// Returns 
// Current square, to new square
export const botOne = (
    whitePieces: { [key: string]: string },
    blackPieces: { [key: string]: string },
    castlingVariables: { [key: string]: boolean },
) => {

    // Piece locations
    const whitePieceLocations = Object.values(whitePieces);
    const blackPieceLocations = Object.values(blackPieces);

    // Get all legal moves for both players
    const allLegalMoves = allPieceLegalMoves(whitePieces, blackPieces, castlingVariables)

    let bestInDanger = ""
    let bestInDangerLocation = ""
    let bestInDangerValue = 0

    let bestToAttack = ""
    let bestToAttackLocation = ""
    let bestToAttackValue = 0

    const getPiecenameByLocation = (obj: { [s: string]: unknown; } | ArrayLike<unknown>, value: unknown) => {
        return Object.entries(obj).find(([key, val]) => val === value)?.[0] || null;
    };

    // DEFENSE
    // What pieces are being targeted by white?
    let threatened = blackPieceLocations.filter(location =>
        allLegalMoves.combinedLegalMoveArrayWhite.includes(location)
    );

    // Get each piece being targeted by white
    const threatenedPieceNames = threatened.map((target) => 
        getPiecenameByLocation(blackPieces, target) 
    );

    // Loop through all threatened pieces and determine most valuable piece
    if(threatenedPieceNames.length > 0) {
        threatenedPieceNames.forEach((piece) => {
            if(!piece) return
            console.log(piece)
            let name = variableNamesToPieceType[piece]
            let value = pieceTypeToValue[name]
            if(value > bestInDangerValue) {
                bestInDanger = piece
                bestInDangerLocation = blackPieces[piece]
                bestInDangerValue = value
            }
        })
    }

    // What pieces can black attack?
    let canAttack = whitePieceLocations.filter(location =>
        allLegalMoves.combinedLegalMoveArrayBlack.includes(location)
    );

    // Get each piece being targeted by white
    const canAttackPieces = canAttack.map((target) => 
        getPiecenameByLocation(whitePieces, target) 
    );

    // Loop through all pieces black can attack and determine most valuable
    if(canAttackPieces.length > 0) {
        canAttackPieces.forEach((piece) => {
            if(!piece) return
            let name = variableNamesToPieceType[piece]
            let value = pieceTypeToValue[name]
            if(value > bestToAttackValue) {
                bestToAttack = piece
                bestToAttackLocation = whitePieces[piece]
                bestToAttackValue = value
            }
        })
    }
  
    let originalTile = ""
    let pieceName = ""
    let moveToTile = ""

    console.log(whatCanAllPiecesSee(whitePieces, blackPieces, castlingVariables))

    if(bestInDangerValue > bestToAttackValue) {
        let allSafeMoves = allLegalMoves.blackPiecesObject[bestInDanger].filter(move => 
            !allLegalMoves.combinedLegalMoveArrayWhite.includes(move)
        )
        console.log(allSafeMoves)
        // allSafeMoves.forEach((move) => {

        // })
        // If cant defend piece, try attack
        if(allSafeMoves.length === 0) {
            bestInDangerValue = 0
            return
        } else {
            const randomMove = allSafeMoves[Math.floor(Math.random() * allSafeMoves.length)];
            moveToTile = randomMove
            pieceName = bestInDanger
            originalTile = whitePieces[pieceName]
        } 
    }

    if(bestToAttackValue > bestInDangerValue) {
        Object.entries(allLegalMoves.blackPiecesObject).forEach(([key, value]) => {
            if (value.includes(bestToAttackLocation)) {
                originalTile = blackPieces[key];
                pieceName = key;
                moveToTile = bestToAttackLocation;
            }
        });
    }
    
    originalTile = blackPieces[pieceName]

    console.log(moveToTile)
    console.log(originalTile)
    console.log(pieceName)

    return


    return {
        moveToTile,
        originalTile,
        pieceName
    }
}