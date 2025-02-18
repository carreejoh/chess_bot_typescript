
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const knightMoves = (
    tile: string, 
    whitePieces: { [key: string]: string }, 
    blackPieces: { [key: string]: string }
) => {

    const whitePiecePositions = Object.values(whitePieces);
    const blackPiecePositions = Object.values(blackPieces);

    const file = tile[0]
    const rank = tile[1]
    let moves = []

    const fileLocationIndex = files.indexOf(file)
    const rankLocationIndex = ranks.indexOf(rank)

    // Find all possible moves
    const move1 = `${files[fileLocationIndex - 2]}${ranks[rankLocationIndex + 1]}`
    const move2 = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex + 2]}`
    const move3 = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex + 2]}`
    const move4 = `${files[fileLocationIndex + 2]}${ranks[rankLocationIndex + 1]}`
    const move5 = `${files[fileLocationIndex + 2]}${ranks[rankLocationIndex - 1]}`
    const move6 = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex - 2]}`
    const move7 = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex - 2]}`
    const move8 = `${files[fileLocationIndex - 2]}${ranks[rankLocationIndex - 1]}`

    moves.push(move1, move2, move3, move4, move5, move6, move7, move8)

    // Find moves that are off the board and remove them
    moves = moves.filter((move) => !move.includes("undefined"));

    // Find moves that are occupied by the same player's pieces
    if (whitePiecePositions.includes(tile)) {
        moves = moves.filter((position) => !whitePiecePositions.includes(position));
    }
    if (blackPiecePositions.includes(tile)) {
        moves = moves.filter((position) => !blackPiecePositions.includes(position));
    }

    return moves
}