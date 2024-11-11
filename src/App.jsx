import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './PAGES/Home'
import Auth from './PAGES/Auth'
import Projects from './PAGES/Projects'
import Dashboard from './PAGES/Dashboard'
import Footer from './COMPONENTS/Footer'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './context/AuthContextAPI'
import Pnf from './PAGES/Pnf'

function App() {

  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAuthorised(true)
    } else {
      setIsAuthorised(false)
    }
  }, [isAuthorised])
  console.log(isAuthorised);


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {
          isAuthorised &&
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/projects' element={<Projects />} />
          </>
        }
        {/* <Route path='/dashboard' element={isAuthorised ? <Dashboard /> : <Navigate to={'/login'} />} /> */}
        {/* <Route path='/projects' element={isAuthorised ? <Projects /> : <Navigate to={'/login'} />} /> */}
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/*' element={<Pnf />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
