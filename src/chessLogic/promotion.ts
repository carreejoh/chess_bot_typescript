

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