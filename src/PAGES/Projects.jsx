import React, { useEffect, useState } from 'react'
import Header from '../COMPONENTS/Header'
import ProjectCard from '../COMPONENTS/ProjectCard'
import { Row, Col } from 'react-bootstrap'
import { getAllProjectAPI } from '../SERVICE/allPI'


const Projects = () => {

  const[searchKey,setSearchKey]=useState("")
  const [allProjects, setAllProjects] = useState([])

useEffect(()=>{
  getAllProjects()
},[searchKey])

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllProjectAPI(searchKey,reqHeader)
        if (result.status == 200) {
          setAllProjects(result.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(allProjects);
  

  return (
    <>
      <Header />
      <div style={{ paddingTop: "100px" }} className='container-fluid'>
        <div className="d-flex justify-content-between">
          <h1>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search Project By Their Languages' className='form-control w-25' />
        </div>
        <Row className="mt-3 d-flex justify-content-evenly">
          {
            allProjects?.length>0?
            allProjects?.map(project=>(
              <Col className="mb-3" sm={12} md={6} lg={4}>
            <ProjectCard displayData={project}/>
          </Col>
            ))
            :
            <div className='text-danger fw-bolder'>Projects Not Found!!!</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects