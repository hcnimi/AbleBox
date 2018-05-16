import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = (props) => {
  return (
    <header>
      <img id="logo" src={logo}/>
      <nav>
          <Link to='/'>Home</Link>
          <Link to='/upload'>Upload</Link>
          <Link to='/logout'>Sign Out</Link>
      </nav>
    </header>
  )
}

export default Header;
