import { BasicFeatherIcon } from '../styled-components/sharable'

function FeatherPlusIcon() {
  // <line x1="12" y1="5" x2="12" y2="19">
  const verticalLine = React.createElement('line', {
    x1: 12,
    y1: 5,
    x2: 12,
    y2: 19,
  })

  // <line x1="5" y1="12" x2="19" y2="12"></line>
  const horizontalLine = React.createElement('line', {
    x1: 5,
    y1: 12,
    x2: 19,
    y2: 12,
  })

  const FeatherPlusIcon = window.styled(BasicFeatherIcon)`
    stroke: #000;
  `

  const icon = React.createElement(
    FeatherPlusIcon,
    {
      viewBox: '0 0 24 24',
    },
    horizontalLine,
    verticalLine,
  )

  return icon
}

export default FeatherPlusIcon
