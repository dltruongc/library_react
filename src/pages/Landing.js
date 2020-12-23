import logo from '../assets/icon.png';
import './Landing.css';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <header className='Header'>
      <nav className='nav '>
        <div className='w-1140'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt='ITLib' />
            </Link>
            <Link to='/'>
              <div className='logo-title'>ITLib</div>
            </Link>
          </div>
          <ul className='main-nav '>
            <li className='nav-item'>
              <a href='/'>Home</a>
            </li>
            <li className='nav-item'>
              <a href='about'>About</a>
            </li>
            <li className='nav-item'>
              <a href='#'>More</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className='w-1140'>
        <div className='hero-box'>
          <h1>Welcome to IT Library. What do you gonna do?</h1>
          <a href='#' className='btn btn-full'>
            Borrow book
          </a>
          <a href='#' className='btn btn-ghost'>
            Read more
          </a>
        </div>
      </div>
    </header>
  );
}
