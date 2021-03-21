import { ParentContainer, EntitySwitcher } from './styled-components/sharable'

import FeatherCollapsibleTreeModeIcon from './icons/FeatherCollapsibleTree'
import FeatherCheckedIcon from './icons/FeatherCheckedIcon'

function D3TreeModeSwitcher({ machine }) {
  const entityInfoSwitcherLabel = React.createElement(
    'span',
    {
      className: 'ml-2',
    },
    `Change collapsible tree mode`,
  )

  const collapseModeIcon = FeatherCollapsibleTreeModeIcon()

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
    collapseModeIcon,
  )

  const entitySwitcherContainer = React.createElement(
    ParentContainer,
    null,
    switcherCollapseModeSelectEntityMode,
    entityInfoSwitcherLabel,
  )

  return entitySwitcherContainer
}

export default D3TreeModeSwitcher
