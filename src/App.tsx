import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {

useEffect(() => {
  console.log(import.meta.env.VITE_BASE_URL)
}, [])

  return (
    <>
      <Toaster />

    </>
  )
}

export default App
