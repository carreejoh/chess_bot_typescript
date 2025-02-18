import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="w-[100vw] h-14 bg-white fixed z-[100] flex items-center pl-14 pr-14 shadow-md">
            <Link className="mr-6" to="/chess">
                <h2>Chess</h2>
            </Link>
            <Link className="" to="/searchAlgorithms">
                <h2>Algorithms</h2>
            </Link>
        </div>
    )
}

export default Header