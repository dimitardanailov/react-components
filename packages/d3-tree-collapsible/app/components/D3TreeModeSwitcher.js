import {
  ParentContainer,
  EntitySwitcher,
  IconChecked,
} from './styled-components/sharable'

function D3TreeModeSwitcher({ machine }) {
  const entityInfoSwitcherLabel = React.createElement(
    'span',
    {
      className: 'ml-2',
    },
    `Change collapsible tree mode`,
  )

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
    checkedIcon,
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
