import { hot } from 'react-hot-loader/root'

import data from './jsons/data.json'
import jsonRecord from './jsons/record.json'
import request from './jsons/request.json'

import D3Tree from '../components/D3Tree'

function HomePage() {
  const Service = {
    updateParentChildRelationship: () => {
      console.log('request', request)
      return {
        jsonData: request,
      }
    },
  }

  return React.createElement(D3Tree, {
    jsonData: data,
    jsonRecord: jsonRecord,
    RequestService: Service,
  })
}

export default hot(HomePage)
