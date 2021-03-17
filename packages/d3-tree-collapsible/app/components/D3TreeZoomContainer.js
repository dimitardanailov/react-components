import { ZoomIn, ZoomOut, StyledPlusIcon } from './styled-components/sharable'

function D3ZoomContainer({ zoomInIdentifier, zoomOutIdentifier }) {
  // <line x1="12" y1="5" x2="12" y2="19">
  const plusIconLine1 = React.createElement('line', {
    x1: 12,
    y1: 5,
    x2: 12,
    y2: 19,
  })

  // <line x1="5" y1="12" x2="19" y2="12"></line>
  const plusIconLine2 = React.createElement('line', {
    x1: 5,
    y1: 12,
    x2: 19,
    y2: 12,
  })

  const plusIcon = React.createElement(
    StyledPlusIcon,
    {
      viewBox: '0 0 24 24',
    },
    plusIconLine1,
    plusIconLine2,
  )

  const zoomInContainer = React.createElement(
    'div',
    {
      id: zoomInIdentifier,
    },
    plusIcon,
  )

  const zoomOutIcon = React.createElement(
    'i',
    {
      className: 'fas fa-minus',
    },
    null,
  )

  const zoomOutContainer = React.createElement(
    ZoomOut,
    {
      id: zoomOutIdentifier,
    },
    zoomOutIcon,
  )

  const zoomContainer = React.createElement(
    'div',
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
