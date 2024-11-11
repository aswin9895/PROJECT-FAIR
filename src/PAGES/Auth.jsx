import React, { useContext, useState } from 'react'
import autLoginImg from '../assets/rb_3180.png'
import { Form, FloatingLabel, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../SERVICE/allPI'
import { tokenAuthContext } from '../context/AuthContextAPI'


const Auth = ({ insideRegister }) => {

  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const [isLogined, setIsLogined] = useState(false)
  const [inputData, setInputData] = useState({
    username: "", email: "", password: ""
  })
  // console.log(inputData);

  // register button
  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("Inside ghandleregister");
    if (inputData.username && inputData.email && inputData.password) {
      // alert("Make API Call")
      try {
        const result = await registerAPI(inputData)
        // console.log(result);
        if (result.status == 200) {
          alert(`Welcome ${result.data?.username}, Please login to explore our website!!!`)
          navigate('/login')
          setInputData({ username: "", email: "", password: "" })
        } else {
          if (result.response.status == 406) {
            alert(result.response.data)
            setInputData({ username: "", email: "", password: "" })
            navigate('/login')
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill The Form!!!")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (inputData.email && inputData.password) {
      try {
        const result = await loginAPI(inputData)
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          setIsAuthorised(true)
          setIsLogined(true)
          setTimeout(() => {
            setInputData({ username: "", email: "", password: "" })
            navigate('/')
            setIsLogined(false)
          }, 2000);
        } else {
          if (result.response.status == 404) {
            alert(result.response.data)
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill The Form Completely!!!")
    }
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%" }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={autLoginImg} alt="" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <h1 className="mt-2"><i className="fa-brands fa-docker"></i>Project Fair</h1>
              <h5>Sign {insideRegister ? "Up" : "In"} To Your Account</h5>

              {/* form */}

              <Form>
                {
                  insideRegister &&
                  <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-3">
                    <Form.Control value={inputData.username} onChange={(e) => setInputData({ ...inputData, username: e.target.value })} type="text" placeholder="Username" />
                  </FloatingLabel>
                }
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control value={inputData.email} onChange={(e) => setInputData({ ...inputData, email: e.target.value })} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control value={inputData.password} onChange={(e) => setInputData({ ...inputData, password: e.target.value })} type="password" placeholder="Password" />
                </FloatingLabel>
                {
                  insideRegister ?
                    <div className="mt-3">
                      <button onClick={handleRegister} className="btn btn-primary mb-2">Register</button>
                      <p>Already A User? Please Click Here To <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                      <button onClick={handleLogin} className="btn btn-primary mb-2 d-flex align-items-center">Login
                        {isLogined && <Spinner className='ms-2' animation="border" variant="light" />}
                      </button>
                      <p >New User? Please Click Here To <Link to={'/register'}>Register</Link></p>
                    </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth