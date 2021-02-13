import { hot } from 'react-hot-loader/root'

import nodes from './jsons/nodes.json'

import D3TreeNodeSwitcher from '../../components/D3TreeNodeSwitcher'

function MultiSelectorPage() {
  const params = {
    debug: true,
    nodes,
  }

  return React.createElement(D3TreeNodeSwitcher, params)
}

export default hot(MultiSelectorPage)
