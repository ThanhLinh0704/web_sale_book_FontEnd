import { useState } from 'react'
import './App.css'
import Navbar from './layouts/header-footer/Navbar'
import Footer from './layouts/header-footer/Footer'
import HomePage from './layouts/homepage/HomePage'
import { getAllBook } from './api/BookAPI'

function App() {
  const [count, setCount] = useState(0)

  // getAllBook().then().catch();
  return (
    <div className='App'>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  )
}

export default App
