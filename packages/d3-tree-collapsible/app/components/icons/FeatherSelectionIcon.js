import { BasicFeatherIcon } from '../styled-components/sharable'

function FeatherSelectionIcon() {
  // <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
  const leftSide = React.createElement('path', {
    d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
  })

  // <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  const rightSide = React.createElement('path', {
    d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  })

  const Icon = window.styled(BasicFeatherIcon)`
    stroke: #000;
  `

  const icon = React.createElement(
    Icon,
    {
      viewBox: '0 0 24 24',
    },
    leftSide,
    rightSide,
  )

  return icon
}

export default FeatherSelectionIcon
