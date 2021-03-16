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

export {
  ElementWrapper,
  SVGContainer,
  ParentContainer,
  StyledSelectorListItem,
  StyledSelectorListTextItem,
  StyledNodeContainer,
}
