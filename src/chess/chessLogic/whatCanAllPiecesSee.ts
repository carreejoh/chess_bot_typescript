import { whereCanThatPieceMove } from "./whereCanThatPieceMove";
import { whatCanPawnsAttack } from "../chessLogic/pieceMovements/pawnMoves";

// Check both black and white pieces to see what they can attack

export const whatCanAllPiecesSee = (
    whitePieces: { [key: string] : string },
    blackPieces: { [key: string] : string },
    castlingVariables: { [key: string] : boolean }
) => {
    
    let allWhiteMoves = []
    let allBlackMoves = []

    const tempWhite: { [key: string]: string } = {};
    const tempWhitePawns: { [key: string]: string } = {};
    const tempBlack: { [key: string]: string } = {};
    const tempBlackPawns: { [key: string]: string } = {};
    
    // Loop through white and black pieces and separate them into pawns/everything else
    Object.entries(whitePieces).forEach(([key, value]) => {
        if (key.toLowerCase().includes("pawn")) {
            tempWhitePawns[key] = value;
        } else {
            tempWhite[key] = value;
        }
    });
    
    Object.entries(blackPieces).forEach(([key, value]) => {
        if (key.toLowerCase().includes("pawn")) {
            tempBlackPawns[key] = value;
        } else {
            tempBlack[key] = value;
        }
    });
    

    // Combine the seperated objects for all piece locations including proposed move

    const combinedWhite = { ...tempWhite, ...tempWhitePawns }
    const combinedBlack = { ...tempBlack, ...tempBlackPawns }

    // Calculate what all white/black pieces can see (capture) not including pawns,
    // with the proposed move

    const whatWhiteMajorsSee = Object.entries(tempWhite).reduce<string[]>((acc, [key, value]) => {
        const moves = whereCanThatPieceMove(value, key, combinedWhite, combinedBlack, castlingVariables);
        return [...acc, ...moves];
    }, []);

    const whatBlackMajorsSee = Object.entries(tempBlack).reduce<string[]>((acc, [key, value]) => {
        const moves = whereCanThatPieceMove(value, key, combinedWhite, combinedBlack, castlingVariables);
        return [...acc, ...moves];
    }, []);

    // Calculate what all white/black pawns can see (capture)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const whatCanWhitePawnsSee = Object.entries(tempWhitePawns).reduce<string[]>((acc, [key, value]) => {
        const moves = whatCanPawnsAttack(value, combinedWhite, combinedBlack);
        return [...acc, ...moves];
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const whatCanBlackPawnsSee = Object.entries(tempBlackPawns).reduce<string[]>((acc, [key, value]) => {
        const moves = whatCanPawnsAttack(value, combinedWhite, combinedBlack);
        return [...acc, ...moves];
    }, []);

    // Combine arrays for each player to see all legal attacking tiles,
    // Filter out any undefined values

    allWhiteMoves = [...whatWhiteMajorsSee, ...whatCanWhitePawnsSee]
    allBlackMoves = [...whatBlackMajorsSee, ...whatCanBlackPawnsSee]

    const unFilteredWhiteMoves = allWhiteMoves
    const unFilteredBlackMoves = allBlackMoves 

    allWhiteMoves = [...new Set(allWhiteMoves)].filter(
        (move) => 
            move.toLowerCase() !== "nnan" && !move.toLowerCase().includes("undefined")
    );
    
    allBlackMoves = [...new Set(allBlackMoves)].filter(
        (move) => 
            move.toLowerCase() !== "nnan" && !move.toLowerCase().includes("undefined")
    );

    return { allWhiteMoves, allBlackMoves, unFilteredWhiteMoves, unFilteredBlackMoves }

};