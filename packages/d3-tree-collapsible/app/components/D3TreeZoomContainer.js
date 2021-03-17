import FeatherPlusIcon from './icons/FeatherPlusIcon'
import FeatherMinusIcon from './icons/FeatherMinusIcon'

import { SimpleButton, StyledZoomContainer } from './styled-components/sharable'

function D3ZoomContainer({ zoomInIdentifier, zoomOutIdentifier }) {
  const zoomInContainer = React.createElement(
    SimpleButton,
    {
      id: zoomInIdentifier,
    },
    FeatherPlusIcon(),
  )

  const zoomOutContainer = React.createElement(
    SimpleButton,
    {
      id: zoomOutIdentifier,
    },
    FeatherMinusIcon(),
  )

  const zoomContainer = React.createElement(
    StyledZoomContainer,
    {},
    zoomInContainer,
    zoomOutContainer,
  )

  return zoomContainer
}

const zoomConfiguration = svg => {
  const g = svg.append('g')

  const zoom = d3
    .zoom()
    .scaleExtent([0.05, 3])
    .on('zoom', event => {
      return g.attr('transform', event.transform)
    })

  svg
    .call(zoom)
    .on('dblclick.zoom', null)
    .on('wheel.zoom', null)

  return { g, zoom }
}
const zoomInFunction = (svg, zoom, zoomInIdentifier) => {
  d3.select('#' + zoomInIdentifier).on('click', () => {
    zoom.scaleBy(svg.transition().duration(700), 1.2)
  })
}

const zoomOutFunction = (svg, zoom, zoomOutIdentifier) => {
  d3.select('#' + zoomOutIdentifier).on('click', () => {
    zoom.scaleBy(svg.transition().duration(700), 0.8)
  })
}

export default D3ZoomContainer
export { zoomConfiguration, zoomInFunction, zoomOutFunction }
