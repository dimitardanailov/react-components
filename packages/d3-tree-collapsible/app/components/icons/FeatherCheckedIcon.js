import { IconChecked } from '../styled-components/sharable'

function FeatherCheckedIcon() {
  const polyline = React.createElement('polyline', {
    points: '20 6 9 17 4 12',
  })

  const checkedIcon = React.createElement(
    IconChecked,
    {
      viewBox: '0 0 24 24',
    },
    polyline,
  )

  return checkedIcon
}
export default FeatherCheckedIcon
