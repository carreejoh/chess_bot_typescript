import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl bg-gray-500'> + React</h1>
      <div className="card">
        <button className='text-xl' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className='text-2xl'>
           <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
