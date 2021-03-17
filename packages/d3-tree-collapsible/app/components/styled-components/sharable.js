const ElementWrapper = window.styled.div`
  margin: 1rem;

  border-radius: 4px;
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.3);
  border: 1px solid #b5b5b5;
  background-color: #ffffff;

  padding: 1rem;
`
const SVGContainer = window.styled.div`
  position: relative;

  margin-top: 1rem;
`

const ParentContainer = window.styled.div`
  position: relative;

  display: flex;
  flex-direction row;
  justify-content: flex-start;
  align-items: center;
`

const StyledSelectorListItem = window.styled.div`
  position: relative;

  padding: 0 0.35rem;
  cursor: pointer;

  text-align: center;
`

const StyledSelectorListTextItem = window.styled.div`
  background: #fff;

  padding: 4px 12px;
  color: rgba(0, 0, 0, 0.8); 
  background-color: ${props => (props.checked ? '#d9ddf5' : '#fff')}; 

  margin-bottom: 0.4rem;

  border-radius: 4px;
  border: solid 1px #b5b5b5;

  box-shadow: ${props =>
    props.checked ? '3px 3px 10px 0 rgba(0, 0, 0, 0.3)' : 'none'}; ;

  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;

  text-transform: uppercase;
`

const StyledNodeContainer = window.styled.div`
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const entityActiveColour = '#ab56af'
const EntitySwitcher = window.styled.button`
  position: relative;

  margin-left: 0.4rem;
  padding: 0.2rem;
  border-radius: 12.5%;
  border: 2px solid ${props =>
    props.checked ? entityActiveColour : '#808080'};
  background: ${props => (props.checked ? entityActiveColour : '#fff')};

  &:focus {
    outline: none;
  }
`

// https://feathericons.com/
const BasicFeatherIcon = window.styled.svg`
  fill: none;
  stroke-width: 2px;
  width: 24px;
  height: 24px;
`

const IconChecked = window.styled(BasicFeatherIcon)`
  stroke: #fff;
`

const StyledPlusIcon = window.styled(BasicFeatherIcon)`
  stroke: #000;
`

const ZoomIn = window.styled.button`
  position: relative;
  margin-left: 0.4rem;
  padding: 0.2rem;
  border-radius: 12.5%;
  background: rgb(255, 255, 255);
  border: 2px solid rgb(128, 128, 128);
  width: 34px;
  height: 36px;

  &:focus {
    outline: none;
  }
`

const ZoomOut = window.styled.button`
  position: relative;
  margin-left: 0.4rem;
  padding: 0.2rem;
  border-radius: 12.5%;
  background: rgb(255, 255, 255);
  border: 2px solid rgb(128, 128, 128);
  width: 34px;
  height: 36px;

  &:focus {
    outline: none;
  }
`

export {
  ElementWrapper,
  SVGContainer,
  ParentContainer,
  StyledSelectorListItem,
  StyledSelectorListTextItem,
  StyledNodeContainer,
  EntitySwitcher,
  entityActiveColour,
  IconChecked,
  BasicFeatherIcon,
  StyledPlusIcon,
  ZoomIn,
  ZoomOut,
}
