import 'react-hot-loader'

import HomePage from './pages/HomePage/HomePage'
import MultiSelectorPage from './pages/MultiSelectorPage/MutliSelectorPage'
import RadioSelectorPage from './pages/RadioSelectorPage/RadioSelectorPage'

window.addEventListener('load', async () => {
  const domContainer = document.querySelector('#app')
  // ReactDOM.render(React.createElement(HomePage), domContainer)
  ReactDOM.render(React.createElement(MultiSelectorPage), domContainer)
  // ReactDOM.render(React.createElement(RadioSelectorPage), domContainer)
})

if (module.hot) {
  module.hot.accept()
}
