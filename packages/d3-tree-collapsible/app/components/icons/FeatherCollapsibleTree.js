import { BasicFeatherIcon } from '../styled-components/sharable'

function FeatherCollapsibleTreeModeIcon() {
  // <circle cx="6" cy="6" r="3"></circle>
  const circleTop = React.createElement('circle', {
    cx: 6,
    cy: 6,
    r: 3,
  })

  // circle cx="18" cy="18" r="3"></circle>
  const circleBottom = React.createElement('circle', {
    cx: 18,
    cy: 18,
    r: 3,
  })

  // <path d="M6 21V9a9 9 0 0 0 9 9"></path>
  const path = React.createElement('path', {
    d: 'M6 21V9a9 9 0 0 0 9 9',
  })

  const Icon = window.styled(BasicFeatherIcon)`
    stroke: #000;
  `

  const icon = React.createElement(
    Icon,
    {
      viewBox: '0 0 24 24',
    },
    circleTop,
    circleBottom,
    path,
  )

  return icon
}

export default FeatherCollapsibleTreeModeIcon
