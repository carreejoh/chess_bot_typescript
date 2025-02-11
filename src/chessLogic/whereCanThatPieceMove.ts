
import { variableNamesToPieceType } from "../other/referenceObjects";
import { pawnMoves } from "../chessLogic/pieceMovements/pawnMoves";
import { knightMoves } from "../chessLogic/pieceMovements/knightMoves";
import { bishopMoves } from "../chessLogic/pieceMovements/bishopMoves";
import { rookMoves } from "../chessLogic/pieceMovements/rookMoves";
import { queenMoves } from "../chessLogic/pieceMovements/queenMoves";
import { kingMoves } from "../chessLogic/pieceMovements/kingMoves";

// Where can each individual piece move? 
// Take into account checks, king safety, castling, attacks

export const whereCanThatPieceMove = (
    tile: string,
    matchingPiece: string,
    whitePieces: { [key: string] : string },
    blackPieces: { [key: string] : string },
    castlingVariables: { [key: string] : boolean }
) => {

    const pieceName = variableNamesToPieceType[matchingPiece];

    let moves: string[] = [];

    if (pieceName === "pawn") {
        moves = pawnMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "knight") {
        moves = knightMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "bishop") {
        moves = bishopMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "rook") {
        moves = rookMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "queen") {
        moves = queenMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "king") {
        moves = kingMoves(
            tile, 
            whitePieces, 
            blackPieces,
            castlingVariables
        );
    }

    return moves;
};
