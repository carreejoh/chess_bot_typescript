import { Routes, Route } from "react-router-dom";

import Header from './global/header'

import Main from './chess/main'
import AlgorithmsMain from "./algorithms/main";
import StatsMain from "./statistics/main";

function App() {

  return (
    <>
      <Header />
      <div className="w-[100vw] h-[100vh] bg-gray-200">
      <Routes>
        <Route path="/chess" element={<Main />} />
        <Route path="/searchAlgorithms" element={<AlgorithmsMain/>}/>
        <Route path="/statistics" element={<StatsMain/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
