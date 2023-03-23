import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <><div className='navbar-1'>
      <div className='navbar-left'><h2>Product Management System</h2></div>
      <div className='navbar-right'>
        <ul className='navbar-ul-list'>
            <li>
                <Link to='/products/add-product'>Add Products</Link>
            </li>
            <li>
                <Link to='/'>Show All Products</Link>
            </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Navbar