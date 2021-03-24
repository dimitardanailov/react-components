import {
  ParentContainer,
  StyledTreeModeSwitcher,
} from './styled-components/sharable'

import FeatherCollapsibleTreeModeIcon from './icons/FeatherCollapsibleTree'
import FeatherSelectionIcon from './icons/FeatherSelectionIcon'

function D3TreeModeSwitcher({ machine, label, activeColor }) {
  const entityInfoSwitcherLabel = React.createElement(
    'span',
    {
      className: 'ml-2',
    },
    label,
  )

  const collapseModeIcon = FeatherCollapsibleTreeModeIcon()
  const selectionModeIcon = FeatherSelectionIcon({
    stroke: '#fff',
  })

  const switcherCollapseModeSelectEntityMode = React.createElement(
    StyledTreeModeSwitcher,
    {
      checked: machine.state.matches('select_entity'),
      activeColor,
      onClick: () => {
        if (machine.state.matches('collapse')) {
          machine.send('SELECT_ENTITY')
        } else {
          machine.send('COLLAPSE')
        }
      },
    },
    machine.state.matches('collapse') ? collapseModeIcon : selectionModeIcon,
  )

  const entitySwitcherContainer = React.createElement(
    ParentContainer,
    null,
    switcherCollapseModeSelectEntityMode,
    entityInfoSwitcherLabel,
  )

  return entitySwitcherContainer
}

D3TreeModeSwitcher.defaultProps = {
  activeColor: 'red',
  label: 'Change collapsible tree mode',
}

D3TreeModeSwitcher.propTypes = {
  label: window.PropTypes.string,
  activeColor: window.PropTypes.string,
}

export default D3TreeModeSwitcher
