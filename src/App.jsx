import { Outlet } from "react-router-dom"

import "./App.css"

function App() { 

  return (
    <div className="Word">
      <Outlet/>
    </div>
  )
}

export default App
