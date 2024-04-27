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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <App style={{ padding: '500' }} /> {/* Justera paddingen runt App */}

    <footer style={{ marginTop: 'auto', width: '100%', textAlign: 'left', padding: '10px' }}> &copy; 2024 LNU
      </footer>
    </div>
  </React.StrictMode>,
)
