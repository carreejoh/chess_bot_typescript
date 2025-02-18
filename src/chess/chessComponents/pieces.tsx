import { useState, useEffect } from "react";
import { variableNamesToURLPath } from "../other/referenceObjects";

// Define what types props should be
interface PieceProps {
    index: number;
    tile: string;
    whitePieces: { [key: string]: string };
    blackPieces: { [key: string]: string };
    handleBoardClick: (tile: string) => void;
    animations: { [key: string]: number },
    tileToBeAnimated: string,
    attacks: string[],
    isWhiteKingInCheck: boolean,
    isBlackKingInCheck: boolean   
}

function Piece({ 
    index, 
    tile, 
    whitePieces, 
    blackPieces,
    handleBoardClick,
    animations,
    tileToBeAnimated,
    attacks,
    isWhiteKingInCheck,
    isBlackKingInCheck 
}: PieceProps) {

    // Find out if the square is white or black, and if it contains a piece
    const isBlack = Math.floor(index / 8) % 2 === index % 2;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const matchingPieceWhite = Object.entries(whitePieces).find(([_, value]) => value === tile);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const matchingPieceBlack = Object.entries(blackPieces).find(([_, value]) => value === tile);
    const [tilePosition, setTilePosition] = useState({
        x: 0,
        y: 0
    })
    const [count, setCount] = useState(0)

    // set the new tile position
    useEffect(() => {
        if(tileToBeAnimated === tile) {
            let tempX = animations.dx
            let tempY = -animations.dy
            setTilePosition({
                x: tempX,
                y: tempY
            })
        }
    }, [tileToBeAnimated])

    // This counts how many times the tile is in the attacks array
    useEffect(() => {
        if(attacks.length === 0 ) return
        let tempCount = 0
        for (let i = 0; i < attacks.length; i++) {
            if (attacks[i] === tile) {
                tempCount++
            }
        }
        setCount(tempCount)
    }, [attacks, tile])


    // What extra colors should the tile be?
    // Depends on if the king is in check
    const getTileClass = () => {
        if (isWhiteKingInCheck && matchingPieceWhite?.[0]?.includes("King")) {
          return "bg-red-400"; // Highest priority: White King in check
        }
        if (isBlackKingInCheck && matchingPieceBlack?.[0]?.includes("King")) {
          return "bg-red-400"; // Highest priority: Black King in check
        }
          if (count === 1) return "whatPlayerSeesOne";
          if (count === 2) return "whatPlayerSeesTwo";
          if (count > 2) return "whatPlayerSeesThree";
        return "";
    };

    const tileClass = getTileClass()

    return(
        <div
            key={tile}
            className={`col-span-1 row-span-1 cursor-pointer bg-opacity-100
                ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"}
                ${tileClass}`
            }
            onClick={() => handleBoardClick(tile)}
        >
            <div className="fixed mt-[70px] ml-[2px] text-xs text-gray-700">
                {tile}
            </div>
            {matchingPieceWhite && (
                <img
                    alt="chess piece"
                    style={{
                        ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                    }}
                    className={`w-[76px] h-[76px] ml-[5px] mt-[5px] z-[100] duration-150 ease-out`}
                    src={`/${variableNamesToURLPath[matchingPieceWhite[0]]}`}
                />
            )}
            {matchingPieceBlack && (
                <img
                    alt="chess piece"
                    style={{
                        ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                    }}
                    className={`w-[76px] h-[76px] ml-[5px] mt-[5px] z-[100] duration-150 ease-out`}
                    src={`/${variableNamesToURLPath[matchingPieceBlack[0]]}`}
                />
            )}
        </div>
    )
}

export default Piece