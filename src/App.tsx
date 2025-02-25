import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MinecraftEnabled from "./context/minecraftContext";

import Header from './global/header'

import Main from './chess/main'
import AlgorithmsMain from "./algorithms/main";
import StatsMain from "./statistics/main";

function App() {

  const [axeEquipped, setAxeEquipped] = useState(false)

  return (
    <>
      <MinecraftEnabled.Provider value={axeEquipped}>
        <Header
          axeEquipped={axeEquipped}
          setAxeEquipped={setAxeEquipped}
        />
        <div
          className={`w-[100vw] h-[100vh] bg-gray-200 ${axeEquipped ? "cursor-[url('/minecraftAxe.png'),pointer]" : "cursor-default"}`}
        >
          <Routes>
            <Route path="/chess" element={<Main />} />
            <Route path="/searchAlgorithms" element={<AlgorithmsMain />} />
            <Route path="/statistics" element={<StatsMain />} />
          </Routes>
        </div>
        {axeEquipped && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 h-12 w-[600px] bg-gray-300 rounded-lg">
          {/* Your content here */}
        </div>
        
        )}
      </MinecraftEnabled.Provider>
    </>
  )
}

export default App
