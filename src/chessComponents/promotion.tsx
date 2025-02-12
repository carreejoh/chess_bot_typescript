import { useEffect, useState } from "react";

interface PromotionProps {
    showPromotion: string;
}

function Promotion({
    showPromotion
}: PromotionProps) {

    // Where the position of the modal should be 
    const [promotionPosition, setPromotionPosition] = useState({
        x: 0,
        y: 0
    })
    const [isWhite, setIsWhite] = useState(true)
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

    // Find and set the coordinates of the promotion modal
    // relative to where pawn is promoting
    useEffect(() => {
        // Find the location of the promoting piece
        const file = showPromotion[0]
        const rank = showPromotion[1]

        let rankMultiplier = 0

        if(rank === "8") {
            rankMultiplier = 430
            setIsWhite(true)
        } else {
            rankMultiplier = 91
            setIsWhite(false)
        }

        let fileLocation = files.indexOf(file)
        let fileMultiplier = Math.floor(((fileLocation) * 87) + 2)

        setPromotionPosition({
            x: fileMultiplier,
            y: rankMultiplier
        })
    }, [showPromotion])

    return(
        <div className="h-[180px] w-[180px] p-1 rounded-lg shadow-2xl bg-gray-500 z-[1000]" style={{position: "absolute", left: `${promotionPosition.x}px`, bottom: `${promotionPosition.y}px`}}>
            <div className="w-full h-full grid grid-cols-2 grid-rows-2">
                <button className="col-span-1 row-span-1 flex items-center justify-center">
                    <img alt="queen" className="w-[76px] h-[76px]" src={`/${isWhite ? "white_queen.png" : "black_queen.png"}`}/>
                </button>
                <button className="col-span-1 row-span-1 flex items-center justify-center">
                    <img alt="rook" className="w-[76px] h-[76px]" src={`/${isWhite ? "white_rook.png" : "black_rook.png"}`}/>
                </button>
                <button className="col-span-1 row-span-1 flex items-center justify-center">
                    <img alt="bishop" className="w-[76px] h-[76px]" src={`/${isWhite ? "white_bishop.png" : "black_bishop.png"}`}/>
                </button>
                <button className="col-span-1 row-span-1 flex items-center justify-center">
                    <img alt="knight" className="w-[76px] h-[76px]" src={`/${isWhite ? "white_knight.png" : "black_knight.png"}`}/>
                </button>
            </div>
        </div>
    )
}

export default Promotion