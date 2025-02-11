
import Piece from "./pieces"

// What props the board is expecting,
interface BoardProps {
    whitePieces: { [key: string]: string };
    blackPieces: { [key: string]: string };
}

function Board({
    whitePieces,
    blackPieces
}: BoardProps) {

    // This logic builds the board 
    const allBoardSquares: string[] = [];
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    ranks.forEach((rank) => {
        files.forEach((file) => {
            allBoardSquares.push(`${file}${rank}`);
        });
    });

    return (
        <div className="w-[700px] h-[700px] bg-gray-400 grid grid-cols-8 grid-rows-8 border-[4px] border-gray-700">
            {allBoardSquares.map((tile, index) => (
                <Piece
                    key={index}
                    index={index}
                    tile={tile}

                    whitePieces={whitePieces}
                    blackPieces={blackPieces}
                />
            ))}
        </div>
    )

}

export default Board