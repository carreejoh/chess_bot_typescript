import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface HeaderInterface {
    axeEquipped: boolean,
    setAxeEquipped: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<HeaderInterface> = ({
    axeEquipped,
    setAxeEquipped
}) => {
    return (
        <div className="w-[100vw] h-16 bg-white fixed z-[100] flex items-center justify-between pl-14 pr-14 shadow-md">
            <div className="flex items-center">
                <Link className="mr-6" to="/chess">
                    <h2>Chess</h2>
                </Link>
                <Link className="mr-6" to="/searchAlgorithms">
                    <h2>Algorithms</h2>
                </Link>
                <Link to="/statistics">
                    <h2>Statistics</h2>
                </Link>
            </div>
            <div onClick={() => setAxeEquipped(!axeEquipped)} className="w-12 h-12 border-[1px] rounded-md border-gray-300 flex items-center justify-center cursor-pointer">
                {!axeEquipped && (
                <img alt="axe" src="/minecraftAxe.png" className="w-[40px]"/>
                )}
            </div>
        </div>
    )
}

export default Header