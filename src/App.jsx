import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Sidebar from './components/FixedNavigation/Sidebar'
// import Header from './components/FixedNavigation/Header'
import FixedComponent from './components/FixedComponent'
import TrainingContainer from './components/TrainingContainer'

function App() {
  

  return (
    <>
        
     <FixedComponent></FixedComponent>
     <TrainingContainer></TrainingContainer>
      
    
    </>
  )
}

export default App
