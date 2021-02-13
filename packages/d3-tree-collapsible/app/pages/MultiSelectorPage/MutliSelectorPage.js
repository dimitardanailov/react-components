import { hot } from 'react-hot-loader/root'

import nodes from './jsons/nodes.json'

import MainNodeSelector from '../../components/MainNodeSelector'

function MultiSelectorPage() {
  const params = {
    debug: true,
    nodes,
  }

  return React.createElement(MainNodeSelector, params)
}

export default hot(MultiSelectorPage)
