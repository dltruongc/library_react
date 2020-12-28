import MainNav from "../components/MainNav";
import React from "react";
import { Button } from 'react-bootstrap';

export default function Landing() {
  return (
    <header className='Header'>
      <MainNav/>
      <div className='w-1140'>
        <div className='hero-box'>
          <h1>Welcome to IT Library. What do you gonna do?</h1>
          <Button variant='primary'>Borrow book</Button>
          <Button variant='outline-primary' href='#'>Read more</Button>  
        </div>
      </div>
    </header>
  );
}
