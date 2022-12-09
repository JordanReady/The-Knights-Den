import React from 'react'
import ReactDOM from 'react-dom'
import Logout from './logout'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Logout />,
    document.body.appendChild(document.createElement('div')),
  )
})