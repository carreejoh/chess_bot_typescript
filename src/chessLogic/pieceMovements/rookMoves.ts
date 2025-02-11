const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const rookMoves = (
    tile: string, 
    whitePieces: { [key: string]: string }, 
    blackPieces: { [key: string]: string }
) => {

    const whitePiecePositions = Object.values(whitePieces);
    const blackPiecePositions = Object.values(blackPieces);

    let playersArray: string[] = []
    let opponentsArray: string[] = []

    if (whitePiecePositions.includes(tile)) {
        playersArray = whitePiecePositions
        opponentsArray = blackPiecePositions
    }
    if (blackPiecePositions.includes(tile)) {
        playersArray = blackPiecePositions
        opponentsArray = whitePiecePositions
    }

    const file = tile[0]
    const rank = tile[1]
    let moves = []

    const fileLocationIndex = files.indexOf(file)
    const rankLocationIndex = ranks.indexOf(rank)

    for (let i = 1; i < 8; i++) {
        const up = `${file}${ranks[rankLocationIndex + i]}`
        if (playersArray.includes(up)) break
        if (opponentsArray.includes(up)) {
            moves.push(up)
            break
        }
        moves.push(up)
    }
    for (let i = 1; i < 8; i++) {
        const down = `${file}${ranks[rankLocationIndex - i]}`
        if (playersArray.includes(down)) break
        if (opponentsArray.includes(down)) {
            moves.push(down)
            break
        }
        moves.push(down)
    }
    for (let i = 1; i < 8; i++) {
        const left = `${files[fileLocationIndex - i]}${rank}`
        if (playersArray.includes(left)) break
        if (opponentsArray.includes(left)) {
            moves.push(left)
            break
        }
        moves.push(left)
    }
    for (let i = 1; i < 8; i++) {
        const right = `${files[fileLocationIndex + i]}${rank}`
        if (playersArray.includes(right)) break
        if (opponentsArray.includes(right)) {
            moves.push(right)
            break
        }
        moves.push(right)
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}