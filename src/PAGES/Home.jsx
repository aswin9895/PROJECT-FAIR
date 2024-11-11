import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingImg from '../assets/rb_6909.png'
import ProjectCard from '../COMPONENTS/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectAPI } from '../SERVICE/allPI'


const Home = () => {
  const[allHomeProjects,setAllHomeProjects]=useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getAllHomeProjects()
  },[])

const getAllHomeProjects=async () => {
  try {
    const result = await getHomeProjectAPI()
    if (result.status==200) {
      setAllHomeProjects(result.data)
    }
  } catch (error) {
    console.log(error); 
  }
}
console.log(allHomeProjects);


  const handleProjects = () => {
    if (sessionStorage.getItem("token")) {
      navigate('/projects')
    } else {
      alert("Please Login to get full access to our Projects!!!")
    }
  }

  return (
    <>
      {/* landing part */}

      <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center rounded shadow w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: "80px" }}><i className="fa-brands fa-docker"></i> Project Fair</h1>
              <p style={{ textAlign: "justify" }}>One Stop Destination For All Software Develpment projects. Where User can Add And Manage their Projects. Ass Well As Access All Projects Available In Our Website... What Are You Waiting For!!!</p>
              {
                sessionStorage.getItem("token") ?
                  <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
                  :
                  <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
              }
            </div>
            <div className="col-lg-6">
              <img className='img-fluid' src={landingImg} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* explore projects part */}

      <div className="mt-5 text-center">
        <h1 className="mb-5">Explore Our Projects</h1>
        <marquee behavior="" direction="">
          <div className="d-flex">
            {
              allHomeProjects?.map(project=>(
                <div key={project?._id} className="me-5">
              <ProjectCard displayData={project}/>
            </div>
              ))
            }
          </div>
        </marquee>
        <button onClick={handleProjects} className="btn btn-link mt-5">Click Here To View More Projects...</button>
      </div>

      {/* testimonial part */}

      <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
        <h1>Our Testimonials</h1>
        <div className="d-flex align-items-center justify-content-evenly mt-3 w-100">
          <Card className='mx-2' style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png" alt="" />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto minus mollitia atque, vitae.</p>
              </Card.Text>
            </Card.Body>
          </Card>

          {/* card2 */}
          <Card className='mx-2' style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png" alt="" />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto minus mollitia atque, vitae.</p>
              </Card.Text>
            </Card.Body>
          </Card>

          {/* card3 */}
          <Card className='mx-2' style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'60px'} height={'60px'} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png" alt="" />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center'>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto minus mollitia atque, vitae.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home