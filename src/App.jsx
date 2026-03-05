import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/fooldal" element={<Fooldal />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
