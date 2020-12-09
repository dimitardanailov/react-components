import { hot } from 'react-hot-loader/root'

import React from 'react'
import D3Tree from '../components/D3Tree'

function HomePage() {
  return (
    <section>
      <D3Tree />
    </section>
  )
}

export default hot(HomePage)
