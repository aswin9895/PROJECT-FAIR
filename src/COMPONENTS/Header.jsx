import React, { useContext } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../context/AuthContextAPI'



const Header = ({insideDashboard}) => {

  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const navigate = useNavigate()

  const logout =  () => {
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <Navbar style={{zIndex:1}} className="border shadow rounded position-fixed w-100">
    <Container>
      <Link to={'/'} style={{textDecoration:"none"}}>
        <Navbar.Brand style={{color:"white"}} className='fw-bolder'>
          <i className="fa-brands fa-docker me-2"></i>Project Fair
        </Navbar.Brand>
      </Link>
      {
        insideDashboard && 
        <div className="ms-auto">
          <button onClick={logout} style={{textDecoration:"none"}} className="btn btn-link fw-bold">Logout <i className="fa-solid fa-right-from-bracket ps-1"></i></button>
        </div>
      }
    </Container>
  </Navbar>
    )
}

export default Header