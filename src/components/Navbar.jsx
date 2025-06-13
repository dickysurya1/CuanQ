import React from 'react';
import logo from '../assets/img/logo.png'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
    <img src={logo} alt="Logo" style={styles.logo}/>
      <div style={styles.actions}>
        <Link to="/login" style={styles.link}>Sign In</Link>
        <Link to="/signup" style={styles.button}>Get Started</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
  logo: {
    height:'50px',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  button: {
    padding: '10px ',
    backgroundColor: '#7F7CFF',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
  }
};

export default Navbar;
