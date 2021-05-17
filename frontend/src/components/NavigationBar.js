import React from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles'

const NavThing = withStyles ({
  root: {
    backgroundColor: 'rgb(252,140,3, .8)'
      }
})(AppBar);

const NavLink = withStyles ({
  root: {
    margin: '0 10% 0 3%',
    fontSize: '1.3em',
    color: 'white',
    textDecoration: 'none',
      "&:hover": {
        color: 'white',
      }
  },
})(Link);

export default function NavBar() {
    return (
        <NavThing>
              <NavLink to='/' style={{ textDecoration: 'none' }}>
              <h1 className="company-name">S.W.</h1>
              </NavLink>
              <nav>
                <NavLink to='/login' className='link'> Login </NavLink>
                <NavLink to='/signup' className='link signup-btn'> Sign up </NavLink>
              </nav>
              
        </NavThing>
    )
}
