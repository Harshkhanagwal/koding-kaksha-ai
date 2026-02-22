import React from 'react'
import './header.css'
import logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'

const IDEheader = () => {
  return (
    <>
    
        <header className='ide-header'>
            <img src={logo} alt="Logo" />

            <Link className='link' to={-1}>
                <button className="button-primary">
                    Back to Dashboard
                </button>
            </Link>
        </header>
    </>
  )
}

export default IDEheader