import { hot } from 'react-hot-loader/root'

import nodes from './jsons/nodes.json'
import data from './jsons/data.json'

import D3TreeNodeSwitcher from '../../components/D3TreeNodeSwitcher'

function MultiSelectorPage() {
  const updateParentChildRelationship = id => {
    console.log('id', id)

    return data
  }

  const params = {
    debug: true,
    nodes,
    updateParentChildRelationship,
  }

  return React.createElement(D3TreeNodeSwitcher, params)
}

export default hot(MultiSelectorPage)
