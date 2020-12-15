import { hot } from 'react-hot-loader/root'

import data from './jsons/data.json'
import jsonRecord from './jsons/record.json'

import D3Tree from '../components/D3Tree'

function HomePage() {
  return React.createElement(D3Tree, {
    data: data,
    jsonRecord: jsonRecord,
  })
}

export default hot(HomePage)
