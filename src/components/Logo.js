import React from 'react';
import logo from '../assets/images/logo.png';

const Logo = () => {
  return (
    <img
      src={logo}
      alt='jobPond logo'
      className='logo'
      style={{ width: '175px' }}
    />
  );
};

export default Logo;
