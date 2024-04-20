import React from 'react'
import './App.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

export default function BottomBar() {
  return (
    <div className="bottom-container">
    <div className="bottom-bar">
      <ul><FaAngleLeft style={{ fontSize: '20px' }} /><li>Note 1</li><li>Note 2</li><li>Note 3</li><FaAngleRight style={{ fontSize: '20px' }} /></ul>
    </div>
    </div>
  )
}