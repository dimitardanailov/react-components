import 'react-hot-loader'

import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './pages/HomePage'

window.addEventListener('load', async () => {
  const domContainer = document.querySelector('#app')
  ReactDOM.render(React.createElement(HomePage), domContainer)
})

if (module.hot) {
  module.hot.accept()
}
