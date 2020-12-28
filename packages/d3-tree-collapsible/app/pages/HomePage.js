import { hot } from 'react-hot-loader/root'

import data from './jsons/data.json'
import jsonRecord from './jsons/record.json'
import request from './jsons/request.json'

import D3Tree from '../components/D3Tree'

function HomePage() {
  const updateParentChildRelationship = ({ childId, parentId }) => {
    const promise = new Promise(resolve => {
      resolve(request)
    })
    return promise
  }

  return React.createElement(D3Tree, {
    jsonData: data,
    jsonRecord: jsonRecord,
    updateParentChildRelationship: updateParentChildRelationship,
    debug: true,
  })
}

export default hot(HomePage)
