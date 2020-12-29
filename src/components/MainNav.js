import {Link} from "react-router-dom";
import logo from "../assets/icon.png";
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthProvider';
import { CartContext } from '../hooks/CartProvider';
import { Navbar, Nav, Button, Badge } from 'react-bootstrap';
import Avatar from '../components/Avatar';

export default function MainNav () {
  
  const { itemCount } = useContext(CartContext);

  const { auth, logout } = useContext(AuthContext);

  return <div >
    <Navbar bg="dark" expanded={true} expand={'lg'} fixed={'top'} variant="dark">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          width="60"
          height="60"
          className="d-inline-block align-center"
        />{' '}
        ITLib
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav >
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/books'>Books</Nav.Link>
          <Nav.Link href='/type'>Type</Nav.Link>
          <Nav.Link href='/category'>Category</Nav.Link>
          <Nav.Link href='/checkout'>Checkout <Badge variant='primary'>{itemCount || null}</Badge></Nav.Link>
          <Nav.Link href='/about'>About</Nav.Link>
          { auth.name && auth.token ?
            <Nav.Item>
              <Avatar avatar={auth.avatar} />
            </Nav.Item> 
            : <Nav.Link href='/login'>Login</Nav.Link> 
          }
          { auth.name && auth.token ?
            <Nav.Item className='align-center justify-content-center pl-2'>
              <Button onClick={logout} variant='outline-primary' block>Logout</Button>
            </Nav.Item> 
            : <Nav.Link href='/signup'>Signup</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className="margin-80"></div>
  </div>
}