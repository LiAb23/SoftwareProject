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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
    <App />

    <footer style={{ marginTop: '0px', width: '100%', textAlign: 'left', padding: '10px' }}> &copy; 2024 Liv Åberg LNU
      </footer>
    </div>
  </React.StrictMode>,
)
