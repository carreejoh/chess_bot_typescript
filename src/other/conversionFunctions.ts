

export const convertTileLocationToPiecename = (
    tile: string,
    whitePieces: { [key: string]: string },
    blackPieces: { [key: string]: string }
) => {

    let piece = ""
    const whitePieceLocations = Object.values(whitePieces)
    const blackPieceLocations = Object.values(blackPieces)

    if (whitePieceLocations.includes(tile)) {
        let tempPiece = Object.keys(whitePieces).find(key => whitePieces[key] === tile)
        if (!tempPiece) {
            piece = "na"
        } else {
            piece = tempPiece
        }
    }
    if (blackPieceLocations.includes(tile)) {
        let tempPiece = Object.keys(blackPieces).find(key => blackPieces[key] === tile)
        if (!tempPiece) {
            piece = "na"
        } else {
            piece = tempPiece
        }
    }

    return piece
}