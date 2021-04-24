import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'


export default function Navbar() {
    return (
        <NavHeader>
              <Link to='/' style={{ textDecoration: 'none' }}>
              <h1 className="company-name">A web page</h1>
              </Link>
              <nav>
                <Link to='/' className='link'> Home </Link>
                <Link to='/login' className='link'> Login </Link>
                <Link to='/signup' className='link signup-btn'> Sign up </Link>
              </nav>
              
        </NavHeader>
    )
}
