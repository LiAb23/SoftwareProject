/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // app?
import './index.css'
import { FaSistrix } from 'react-icons/fa'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ padding: '10px' }}>
      <h1>My noteboard</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <input type="text" placeholder="Search" style={{ marginRight: '7px' }} />
      < FaSistrix style={{ fontSize: '20px' }} />
      <p></p>
      </div>
    <App />

    <footer style={{ marginTop: 'auto', width: '100%', textAlign: 'left', padding: '10px' }}> &copy; 2024 Liv Åberg LNU
      </footer>
    </div>
  </React.StrictMode>,
)
