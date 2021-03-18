import FeatherPlusIcon from './icons/FeatherPlusIcon'
import FeatherMinusIcon from './icons/FeatherMinusIcon'

import { SimpleButton, StyledZoomContainer } from './styled-components/sharable'

const StyledD3ZoomDelimiter = window.styled.div`
  positiona: relative;

  display: inline-block;
  width: 1px;
  margin: 0 0.2rem;
`

function D3TreeZoomContainer({ zoomInIdentifier, zoomOutIdentifier }) {
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

  const delimiter = React.createElement(StyledD3ZoomDelimiter)

  const zoomContainer = React.createElement(
    StyledZoomContainer,
    {},
    zoomInContainer,
    delimiter,
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

export default D3TreeZoomContainer
export { zoomConfiguration, zoomInFunction, zoomOutFunction }
