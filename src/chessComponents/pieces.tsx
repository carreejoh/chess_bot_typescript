
import { variableNamesToURLPath } from "../other/referenceObjects";

// Define what types props should be
interface PieceProps {
    index: number;
    tile: string;
    whitePieces: { [key: string]: string };
    blackPieces: { [key: string]: string };    
}

function Piece({ 
    index, 
    tile, 
    whitePieces, 
    blackPieces 
}: PieceProps) {

    // Find out if the square is white or black, and if it contains a piece
    const isBlack = Math.floor(index / 8) % 2 === index % 2;
    const matchingPieceWhite = Object.entries(whitePieces).find(([key, value]) => value === tile);
    const matchingPieceBlack = Object.entries(blackPieces).find(([key, value]) => value === tile);

    return(
        <div
            key={tile}
            className={`col-span-1 row-span-1 cursor-pointer
                ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"}
                `
            }
        >
            <div className="fixed mt-[70px] ml-[2px] text-xs text-gray-700">
                {tile}
            </div>
            {matchingPieceWhite && (
                <img
                    alt="chess piece"
                    // style={{
                    //     ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                    // }}
                    className={`w-[76px] h-[76px] ml-[5px] mt-[5px] z-[100] duration-150 ease-out`}
                    src={`/${variableNamesToURLPath[matchingPieceWhite[0]]}`}
                />
            )}
            {matchingPieceBlack && (
                <img
                    alt="chess piece"
                    // style={{
                    //     ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                    // }}
                    className={`w-[76px] h-[76px] ml-[5px] mt-[5px] z-[100] duration-150 ease-out`}
                    src={`/${variableNamesToURLPath[matchingPieceBlack[0]]}`}
                />
            )}
        </div>
    )
}

export default Piece