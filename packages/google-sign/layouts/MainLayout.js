import MainHeader from '../components/MainHeader'

import styled from 'styled-components'

const Container = styled.section`
  position: relative;
  min-height: 100%;
`

const MainLayout = Page => () => (
  <Container>
    <MainHeader />
    <Page />
  </Container>
)

export default MainLayout
