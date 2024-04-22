/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import './App.css'

export function Login({ onLogin }) {
  return (
    <button onClick={onLogin}>Login</button>
    // <div>
    //   <h1>Login</h1>
    //   <form>
    //     <input type="text" placeholder="Username" />
    //     <input type="password" placeholder="Password" />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  )
}