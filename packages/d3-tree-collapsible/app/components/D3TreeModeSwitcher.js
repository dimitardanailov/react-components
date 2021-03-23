import { ParentContainer, EntitySwitcher } from './styled-components/sharable'

import FeatherCollapsibleTreeModeIcon from './icons/FeatherCollapsibleTree'
import FeatherSelectionIcon from './icons/FeatherSelectionIcon'

function D3TreeModeSwitcher({ machine, label }) {
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
    EntitySwitcher,
    {
      checked: machine.state.matches('select_entity'),
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
  label: 'Change collapsible tree mode',
}

D3TreeModeSwitcher.propTypes = {
  label: window.PropTypes.string,
}

export default D3TreeModeSwitcher
