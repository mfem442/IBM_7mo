import React from 'react'
import dashboard from './Dashboard.css'
import Navigation from './Components/Navigation Template/Navigation'
import  Main from "./Main/Main"

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2">
        <Navigation />
        <Main />    
    </div>
  )
}

export default Dashboard
