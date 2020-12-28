import {Link} from "react-router-dom";
import logo from "../assets/icon.png";

import { Navbar, Nav } from 'react-bootstrap';

export default function MainNav () {
  return <div >
    <Navbar bg="dark" expanded={true} expand={'lg'} fixed={'top'} variant="dark">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          width="40"
          height="40"
          className="d-inline-block align-top"
        />{' '}
        ITLib
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav >
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/books'>Books</Nav.Link>
          <Nav.Link href='/about'>About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className="margin-80"></div>
  </div>
}