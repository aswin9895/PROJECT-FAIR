import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userProjectAPI, userProjectRemoveAPI } from '../SERVICE/allPI'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextApi'

const View = () => {
  const {editProjectResponse, setEditProjectResponse}=useContext(editProjectResponseContext)
  const { addProjectResponse, setAddProjectResponse }=useContext(addProjectResponseContext)
  const[userProjects,setUserProjects]=useState([])

  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])
  
  console.log(userProjects);
  

  const getUserProjects=async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result=await userProjectAPI(reqHeader)
        console.log(result);
        if (result.status==200) {
          setUserProjects(result.data)
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  const deleteProject = async(id)=>{
    const token = sessionStorage.getItem("token")
    if (token) {
      // api call 
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        await userProjectRemoveAPI(id,reqHeader)
        getUserProjects()
      } catch (error) {
        console.log(error);
        
      }
  }
}
  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="text-warning">All Projects</h2>
        <div> <Add /> </div>
      </div>
      <div className="mt-2 allProjects">
        {
          userProjects?.length>0?
          userProjects?.map(projects=>(
            <div className="border rounded p-2 d-flex justify-content-between mb-3">
          <h3>{projects.title}</h3>
          <div className="d-flex align-items-center">
            <div> <Edit projects={projects}/> </div>
            <div className="btn"> <a href={projects.github} target='_blank'><i className="fa-brands fa-github"></i></a></div>
            <button onClick={()=>deleteProject(projects?._id)} className="btn text-danger"><i className="fa-solid fa-trash"></i></button>
          </div>
        </div>
          ))
          :
          <div className='fw-bolder text-danger'>Not Uploaded Any Projects Yet!!!</div>
        }
      </div>
    </>
  )
}

export default View