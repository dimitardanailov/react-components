import { hot } from 'react-hot-loader/root'

import D3TreeRadioButton from '../../components/D3TreeRadioButton'

function RadioSelectorPage() {
  const identifiers = {
    '6026e7b0397ee9002f080c1b': 'food-and-drink',
    '6026e7b0397ee9002f080c1c': 'animals',
  }

  const params = {}

  return React.createElement(D3TreeRadioButton, params)
}

export default hot(RadioSelectorPage)
