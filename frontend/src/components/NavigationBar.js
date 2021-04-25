import React from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

const NavBar = withStyles ({
  root: {
    backgroundColor: 'rgb(252,140,3, .8)'
      }
})(AppBar);

export default function Navbar() {
    return (
        <NavBar>
              <Link to='/' style={{ textDecoration: 'none' }}>
              <h1 className="company-name">A web page</h1>
              </Link>
              <nav>
                <Link to='/' className='link'> Home </Link>
                <Link to='/login' className='link'> Login </Link>
                <Link to='/signup' className='link signup-btn'> Sign up </Link>
              </nav>
              
        </NavBar>
    )
}
