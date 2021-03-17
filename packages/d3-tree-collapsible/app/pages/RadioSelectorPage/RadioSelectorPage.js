import { hot } from 'react-hot-loader/root'

import D3TreeRadioButton from '../../components/D3TreeRadioButton'

import dbNodes from './jsons/nodes.json'
import dbSelectedEntity from './jsons/selected-entity.json'

import foods from './jsons/treeNodes/food-and-drink.json'
import animals from './jsons/treeNodes/animals.json'

function RadioSelectorPage() {
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

  const updateDatabaseMetaData = entity => {
    console.log('updateDatabaseMetaData', entity)
  }

  const zoomInIdentifier = 'radio-button-zoom-in'
  const zoomOutIdentifier = 'radio-button-zoom-out'

  const params = {
    dbNodes,
    dbSelectedEntity,
    debug: true,
    updateDatabaseMetaData,
    updateParentChildRelationship,
    zoomInIdentifier,
    zoomOutIdentifier,
  }

  console.log('params', params)

  return React.createElement(D3TreeRadioButton, params)
}

export default hot(RadioSelectorPage)
