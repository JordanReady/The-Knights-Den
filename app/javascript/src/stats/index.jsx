import React from 'react'
import ReactDOM from 'react-dom'
import Stats from './stats'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Stats />,
    document.body.appendChild(document.createElement('div')),
  )
})