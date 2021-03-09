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

export { ElementWrapper, SVGContainer, ParentContainer }
