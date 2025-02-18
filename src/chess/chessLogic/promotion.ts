

export const isThisAPromotion = (piece: string, moveToTile: string) => {

    // Get rank of pawn
    const rank = moveToTile[1]

    if(piece.includes("whitePawn") && rank === "8") {
        console.log("White pawn promotion")
        return true
    }
    if(piece.includes("blackPawn") && rank === "1") {
        console.log("Black pawn promotion")
        return true
    }

    return false
}

export const rebuildLocationsWithPromotion = (
    whitePieces: { [key: string]: string },
    blackPieces: { [key: string]: string },
    pawnToBeConverted: string,
    promotionType: string
) => {
    // Determine if the piece is white or black
    const isWhite = pawnToBeConverted.includes("white");
    
    // Clone the objects to prevent direct mutation
    let whiteClone = { ...whitePieces };
    let blackClone = { ...blackPieces };

    // Select the correct object to update
    let piecesObject = isWhite ? whiteClone : blackClone;

    // Extract the pawn number (e.g., "One", "Two", "Three") from "whitePawnOne"
    const pawnMatch = pawnToBeConverted.match(/Pawn(\w+)/); 

    if (!pawnMatch) {
        return {
            whiteClone,
            blackClone
        };
    }

    const pawnNumber = pawnMatch[1]; // Extracts the pawn identifier

    // Construct the corresponding promotion key dynamically
    const promotionKey = `${isWhite ? "white" : "black"}${pawnNumber}Promotion${promotionType.charAt(0).toUpperCase() + promotionType.slice(1)}`;

    // Update the correct promotion field with the pawn’s current location
    piecesObject[promotionKey] = piecesObject[pawnToBeConverted];

    // Set the promoted pawn's position to "na"
    piecesObject[pawnToBeConverted] = "na";

    // Return updated clones
    return {
        whiteClone,
        blackClone
    };
};

