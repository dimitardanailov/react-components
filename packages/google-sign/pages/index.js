import MainLayout from '../layouts/MainLayout'

import GoogleSignIn from '../components/Google/SignIn'

import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;

  display: flex;
  width: 100%;
  justify-content: center;
`

const Page = () => (
  <Wrapper>
    <GoogleSignIn />
  </Wrapper>
)

export default MainLayout(Page)
