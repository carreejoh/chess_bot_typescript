import { Routes, Route } from "react-router-dom";

import Main from './chess/main'
import Header from './global/header'

function App() {

  return (
    <>
      <Header />
      <div className="w-[100vw] h-[100vh] bg-gray-200">
      <Routes>
        <Route path="/chess" element={<Main />} />
        <Route path="/searchAlgorithms" element={<div>Algorithms Page</div>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
