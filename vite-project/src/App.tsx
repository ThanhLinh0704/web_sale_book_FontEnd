import { useState } from 'react'
import './App.css'
import Navbar from './layouts/header-footer/Navbar'
import Footer from './layouts/header-footer/Footer'
import HomePage from './layouts/homepage/HomePage'
import { getAllBook } from './api/BookAPI'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './layouts/about/About'
import SignUpUser from './layouts/user/SignUpUser'

function App() {
  const [count, setCount] = useState(0)

  // getAllBook().then().catch();
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<SignUpUser />} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App
