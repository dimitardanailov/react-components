import { BasicFeatherIcon } from '../styled-components/sharable'

function FeatherMinusIcon() {
  // <line x1="5" y1="12" x2="19" y2="12"></line>
  const horizontalLine = React.createElement('line', {
    x1: 5,
    y1: 12,
    x2: 19,
    y2: 12,
  })

  const FeatherMinusIcon = window.styled(BasicFeatherIcon)`
    stroke: #000;
  `

  const icon = React.createElement(
    FeatherMinusIcon,
    {
      viewBox: '0 0 24 24',
    },
    horizontalLine,
  )

  return icon
}

export default FeatherMinusIcon
