import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './pages/HomePage'

window.addEventListener('load', async () => {
  const domContainer = document.querySelector('#app')
  ReactDOM.render(React.createElement(HomePage), domContainer)
})
