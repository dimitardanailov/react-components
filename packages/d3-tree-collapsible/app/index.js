import 'react-hot-loader'

import HomePage from './pages/HomePage'
import MultiSelectorPage from './pages/MutliSelectorPage'

window.addEventListener('load', async () => {
  const domContainer = document.querySelector('#app')
  // ReactDOM.render(React.createElement(HomePage), domContainer)
  ReactDOM.render(React.createElement(MultiSelectorPage), domContainer)
})

if (module.hot) {
  module.hot.accept()
}
