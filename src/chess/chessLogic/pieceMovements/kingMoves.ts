const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const kingMoves = (
    tile: string, 
    whitePieces: { [key: string]: string }, 
    blackPieces: { [key: string]: string },
    castlingVariables: { [key: string]: boolean }
) => {

    const whitePiecePositions = Object.values(whitePieces);
    const blackPiecePositions = Object.values(blackPieces);

    let playersArray: string[] = []
    // let opponentsArray: string[] = []

    if (whitePiecePositions.includes(tile)) {
        playersArray = whitePiecePositions
        // opponentsArray = blackPiecePositions
    }
    if (blackPiecePositions.includes(tile)) {
        playersArray = blackPiecePositions
        // opponentsArray = whitePiecePositions
    }

    const file = tile[0]
    const rank = tile[1]
    let moves = []

    const fileLocationIndex = files.indexOf(file)
    const rankLocationIndex = ranks.indexOf(rank)

    const downRight = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex + 1]}`
    if (!playersArray.includes(downRight)) { moves.push(downRight) }

    const downLeft = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex + 1]}`
    if (!playersArray.includes(downLeft)) { moves.push(downLeft) }

    const upRight = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex - 1]}`
    if (!playersArray.includes(upRight)) { moves.push(upRight) }

    const upLeft = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex - 1]}`
    if (!playersArray.includes(upLeft)) { moves.push(upLeft) }

    const down = `${file}${ranks[rankLocationIndex + 1]}`
    if (!playersArray.includes(down)) { moves.push(down) }

    const up = `${file}${ranks[rankLocationIndex - 1]}`
    if (!playersArray.includes(up)) { moves.push(up) }

    const left = `${files[fileLocationIndex - 1]}${rank}`
    if (!playersArray.includes(left)) { moves.push(left) }

    const right = `${files[fileLocationIndex + 1]}${rank}`
    if (!playersArray.includes(right)) { moves.push(right) }

    // Special castle option added into array

    if(
        whitePiecePositions.includes(tile) && 
        !castlingVariables.hasWhiteKingBeenMoved && 
        !castlingVariables.hasWhiteRookTwoBeenMoved && 
        !whitePiecePositions.includes("f1") && 
        !whitePiecePositions.includes("g1")
    ) {
        moves.push("g1")
    }
    if(
        whitePiecePositions.includes(tile) && 
        !castlingVariables.hasWhiteKingBeenMoved && 
        !castlingVariables.hasWhiteRookOneBeenMoved && 
        !whitePiecePositions.includes("b1") && 
        !whitePiecePositions.includes("c1") && 
        !whitePiecePositions.includes("d1")
    ) {
        moves.push("c1")
    }

    // Black castling option

    if(
        blackPiecePositions.includes(tile) && 
        !castlingVariables.hasBlackKingBeenMoved && 
        !castlingVariables.hasBlackRookTwoBeenMoved && 
        !blackPiecePositions.includes("f8") && 
        !blackPiecePositions.includes("g8")
    ) {
        moves.push("g8")
    }
    if(
        blackPiecePositions.includes(tile) && 
        !castlingVariables.hasBlackKingBeenMoved && 
        !castlingVariables.hasBlackRookOneBeenMoved && 
        !blackPiecePositions.includes("b8") && 
        !blackPiecePositions.includes("c8") && 
        !blackPiecePositions.includes("d8")
    ) {
        moves.push("c8")
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}