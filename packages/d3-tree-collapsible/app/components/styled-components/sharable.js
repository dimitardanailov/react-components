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

const StyledTreeModeSwitcher = window.styled.button`
  position: relative;

  padding: 0.2rem;
  border-radius: 12.5%;

  border: 2px solid ${props => (props.checked ? props.activeColor : '#808080')};
  background: ${props => (props.checked ? props.activeColor : '#fff')};

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

const ButtonWrapperStyled = window.styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
`

const Button = window.styled.button`
  position: relative;

  margin-right: 0.25rem;
`

const SimpleButton = window.styled.button`
  position: relative;

  padding: 0.2rem;
  border-radius: 12.5%;
  border: 2px solid #808080;
  background: #fff;

  &:focus {
    outline: none;
  }
`

const StyledZoomContainer = window.styled.div`
  position: relative;

  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
`

const FooterWrapper = window.styled.div`
  position: relative;
  
  display: flex;
  justify-content: flex-end;

  margin: 1rem 0;
`

const ListViewWrapper = window.styled.a`
  positon: relative;

  display: block;
  margin: ${props => props.margin};

  color: var(--blue);
  text-decoration: none;
  cursor: pointer;
`

export {
  ElementWrapper,
  ListViewWrapper,
  FooterWrapper,
  Button,
  ButtonWrapperStyled,
  SimpleButton,
  SVGContainer,
  ParentContainer,
  StyledSelectorListItem,
  StyledSelectorListTextItem,
  StyledNodeContainer,
  StyledTreeModeSwitcher,
  IconChecked,
  BasicFeatherIcon,
  StyledZoomContainer,
}
