import { AppBar, Toolbar,styled } from '@mui/material';
import { Link } from 'react-router-dom';
const Component=styled(AppBar)`
  background: #FFFFFF;
  color: #000;
  
`
const Container=styled(Toolbar)`
  justify-content: center;
 & >a{
  padding: 20px;
  color: #000;
 }
 `
const Header=()=>{

  return(
<Component>
  <Container>
    <Link to='/'>home</Link>
    <Link to='/about'>about</Link>
    <Link to='/contact'>contact</Link>
    <Link to='/logout'>logout</Link>
  
  </Container>
</Component>
  )
}
export default Header;