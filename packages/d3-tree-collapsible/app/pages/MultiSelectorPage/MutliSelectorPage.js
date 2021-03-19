import { hot } from 'react-hot-loader/root'

import dbNodes from './jsons/nodes.json'
import dbSelectedEntities from './jsons/selected-entities.json'

import foods from './jsons/treeNodes/food-and-drink.json'
import animals from './jsons/treeNodes/animals.json'

import D3TreeNodeSwitcher from '../../components/D3TreeNodeSwitcher'
import { update } from 'xstate/lib/actionTypes'

function MultiSelectorPage() {
  const identifiers = {
    '6026e7b0397ee9002f080c1b': 'food-and-drink',
    '6026e7b0397ee9002f080c1c': 'animals',
  }

  const treeNodes = {
    'food-and-drink': foods,
    animals: animals,
  }

  const updateParentChildRelationship = async id => {
    const _promise = new Promise(resolve => {
      const identifier = identifiers[id]
      const _treeData = treeNodes[identifier]

      resolve(_treeData)
    })
    const treeData = await _promise.then()

    return treeData
  }

  const updateDatabaseMetaData = dbSelectedEntities => {
    const ids = dbSelectedEntities.map(entity => {
      return entity._id
    })
    console.log('ids .......', ids.join('#'))
  }

  const zoomInIdentifier = 'multi-selector-button-zoom-in'
  const zoomOutIdentifier = 'multi-selector-button-zoom-out'

  const parentUpdateDBSelectedEntities = function() {
    const promise = new Promise(resolve => {
      resolve(dbSelectedEntities)
    })

    return promise
  }

  const params = {
    dbNodes,
    entityType: 'entity',
    debug: true,
    update: update,
    updateParentChildRelationship,
    updateDatabaseMetaData,
    parentUpdateDBSelectedEntities: parentUpdateDBSelectedEntities,
    zoomInIdentifier,
    zoomOutIdentifier,
  }

  return React.createElement(D3TreeNodeSwitcher, params)
}

export default hot(MultiSelectorPage)
