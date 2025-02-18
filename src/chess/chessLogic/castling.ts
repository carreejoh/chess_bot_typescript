import { convertTileLocationToPiecename } from "../other/conversionFunctions"

// Function to check if either player is attempting to castle

export const isThisCastling = (
    whitePieces: { [key: string]: string },
    blackPieces: { [key: string]: string } ,
    moveToTile: string,
    currentTile: string 
) => {

    let piece = convertTileLocationToPiecename(currentTile, whitePieces, blackPieces)

    // Piece is not a king
    if(!piece.includes("King")) {
        return false
    }

    if(moveToTile === "c1") {
        return true
    }
    if(moveToTile === "g1") {
        return true
    }
    if(moveToTile === "c8") {
        return true
    }
    if(moveToTile === "g8") {
        return true
    }

    return false
}

export const rebuildCastlingVariables = (
    moveToTile: string,
    castlingVariables: {
        hasWhiteKingBeenMoved: boolean;
        hasBlackKingBeenMoved: boolean;
        hasWhiteRookOneBeenMoved: boolean;
        hasWhiteRookTwoBeenMoved: boolean;
        hasBlackRookOneBeenMoved: boolean;
        hasBlackRookTwoBeenMoved: boolean;
    },
    whitePieces: { [key: string]: string },
    blackPieces: { [key: string]: string }
) => {
    let castleVariablesClone = { ...castlingVariables }; 
    let whitePiecesClone = { ...whitePieces };
    let blackPiecesClone = { ...blackPieces };

    if (moveToTile === "c1") {
        castleVariablesClone.hasWhiteKingBeenMoved = true;
        castleVariablesClone.hasWhiteRookOneBeenMoved = true;
        whitePiecesClone.whiteKing = "c1";
        whitePiecesClone.whiteRookOne = "d1";
    }
    if (moveToTile === "g1") {
        castleVariablesClone.hasWhiteKingBeenMoved = true;
        castleVariablesClone.hasWhiteRookTwoBeenMoved = true;
        whitePiecesClone.whiteKing = "g1";
        whitePiecesClone.whiteRookTwo = "f1";
    }
    if (moveToTile === "c8") {
        castleVariablesClone.hasBlackKingBeenMoved = true;
        castleVariablesClone.hasBlackRookOneBeenMoved = true;
        blackPiecesClone.blackKing = "c8";
        blackPiecesClone.blackRookOne = "d8";
    }
    if (moveToTile === "g8") {
        castleVariablesClone.hasBlackKingBeenMoved = true;
        castleVariablesClone.hasBlackRookTwoBeenMoved = true;
        blackPiecesClone.blackKing = "g8";
        blackPiecesClone.blackRookTwo = "f8";
    }

    return {
        castleVariablesClone,
        whitePiecesClone,
        blackPiecesClone
    };
};

export const rebuildCastlingVariablesWithoutCastling = (
    piece: string,
    castlingVariables: {
        hasWhiteKingBeenMoved: boolean;
        hasBlackKingBeenMoved: boolean;
        hasWhiteRookOneBeenMoved: boolean;
        hasWhiteRookTwoBeenMoved: boolean;
        hasBlackRookOneBeenMoved: boolean;
        hasBlackRookTwoBeenMoved: boolean;
    },
) => {
    
    let castleVariablesClone = { ...castlingVariables }; 

    if(piece === "whiteRookOne") { castleVariablesClone.hasWhiteRookOneBeenMoved = true }
    if(piece === "whiteRookTwo") { castleVariablesClone.hasWhiteRookTwoBeenMoved = true }
    if(piece === "whiteKing") { castleVariablesClone.hasWhiteKingBeenMoved = true }
    if(piece === "blackRookOne") { castleVariablesClone.hasBlackRookOneBeenMoved = true }
    if(piece === "blackRookOne") { castleVariablesClone.hasBlackRookTwoBeenMoved = true }
    if(piece === "blackKing") { castleVariablesClone.hasBlackKingBeenMoved = true }

    return castleVariablesClone

}
