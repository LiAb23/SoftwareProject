/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import './App.css'
import Board from './Board.jsx'
import SideBar from './SideBar.jsx'
import BottomBar from './BottomBar'
import { FaRegPlusSquare, FaRegTrashAlt } from 'react-icons/fa'

// A component

// invänta svar från servern först

export default function App() {
  return (
    <div>
    <Board />
    <SideBar /> 
    <div className="container">
      <div className="icon-container">
      <FaRegPlusSquare />
      <FaRegTrashAlt />
      </div>
    </div>
    <BottomBar />
    </div>
  )
}
