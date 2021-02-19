import { hot } from 'react-hot-loader/root'

import dbNodes from './jsons/nodes.json'

import foods from './jsons/treeNodes/food-and-drink.json'
import animals from './jsons/treeNodes/animals.json'

import D3TreeNodeSwitcher from '../../components/D3TreeNodeSwitcher'

function MultiSelectorPage() {
  const identifiers = {
    '6026e7b0397ee9002f080c1b': 'food-and-drink',
    '6026e7b0397ee9002f080c1c': 'animals',
  }

  const treeNodes = {
    'food-and-drink': foods,
    animals: animals,
  }

  const updateParentChildRelationship = id => {
    const identifier = identifiers[id]
    const treeData = treeNodes[identifier]

    return treeData
  }

  const params = {
    debug: true,
    dbNodes,
    updateParentChildRelationship,
  }

  return React.createElement(D3TreeNodeSwitcher, params)
}

export default hot(MultiSelectorPage)
