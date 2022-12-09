import React from 'react'
import ReactDOM from 'react-dom'
import Learn from './learn'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Learn />,
    document.body.appendChild(document.createElement('div')),
  )
})