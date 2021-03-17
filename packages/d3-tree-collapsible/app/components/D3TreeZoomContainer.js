import { ZoomIn, ZoomOut } from './styled-components/sharable'

function D3ZoomContainer({ zoomInIdentifier, zoomOutIdentifier }) {
  const zoomInIcon = React.createElement(
    'i',
    {
      className: 'fas fa-plus',
    },
    null,
  )

  const zoomInContainer = React.createElement(
    ZoomIn,
    {
      id: zoomInIdentifier,
    },
    zoomInIcon,
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
