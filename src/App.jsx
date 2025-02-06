import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Sidebar from './components/FixedNavigation/Sidebar'
// import Header from './components/FixedNavigation/Header'
import FixedComponent from './components/FixedComponent'

function App() {
  

  return (
    <>
        <div className="app">
     <FixedComponent></FixedComponent>
      <div className="content">
        <h1>Welcome to My React App</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
    </>
  )
}

export default App
