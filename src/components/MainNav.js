import {Link} from "react-router-dom";
import logo from "../assets/icon.png";
import {useContext, useState} from 'react';
import { AuthContext } from '../hooks/AuthProvider';
import { CartContext } from '../hooks/CartProvider';
import { Navbar, Nav, Button, Badge } from 'react-bootstrap';
import Avatar from '../components/Avatar';

export default function MainNav () {
  const [open, setOpen] = useState(false);
  const { itemCount } = useContext(CartContext);
  const toggleMenu = () => setOpen(!open);
  const { auth, logout } = useContext(AuthContext);
  return <div >
    <Navbar bg="dark" expanded={true} fixed={'top'} variant="dark">
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
        <div className={`navbar-menu ${open ? 'active' : ''}`}>
          <div onClick={toggleMenu} className="close-menu">
            <svg width="30" height="30" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.23977 1.75977L1.75977 8.23977" stroke="white" stroke-width="1.08" stroke-miterlimit="10" stroke-linecap="square"/>
              <path d="M8.23977 8.23977L1.75977 1.75977" stroke="white" stroke-width="1.08" stroke-miterlimit="10" stroke-linecap="square"/>
            </svg>

          </div>
          <Nav>
            { auth.token && auth.isAdmin
              ? <Nav.Link href='/dashboard' className='rounded border border-primary'>Dashboard</Nav.Link>
              : null
            }
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/books'>Books</Nav.Link>
            <Nav.Link href='/type'>Type</Nav.Link>
            <Nav.Link href='/category'>Category</Nav.Link>
            <Nav.Link href='/checkout'>Checkout <Badge variant='primary'>{itemCount || null}</Badge></Nav.Link>
            <Nav.Link href='/about'>About</Nav.Link>

            { auth.avatar && auth.token ?
              <Nav.Item>
                <Avatar avatar={auth.avatar} />
              </Nav.Item>
              : <Nav.Link href='/login'>Login</Nav.Link>
            }
            { auth.avatar && auth.token ?
              <Nav.Item className='align-center justify-content-center pl-2'>
                <Button onClick={logout} variant='outline-primary' block>Logout</Button>
              </Nav.Item>
              : <><Nav.Link href='/signup'>Signup</Nav.Link><Nav.Link href='/admin/login'>Admin</Nav.Link> </>
            }

          </Nav>
        </div>
        <div onClick={toggleMenu} className="menu-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Navbar.Collapse>
    </Navbar>
    <div className="margin-80"></div>
  </div>
}
