import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadimg from '../assets/image-icon-front-side-with-white-background.png'
import SERVER_URL from '../SERVICE/serverUrl'
import { editProjectResponseContext } from '../context/ContextApi'
import { updateProjectAPI } from '../SERVICE/allPI'


const Edit = ({ projects }) => {

  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const [projectDetails, setProjectDetails] = useState({
    id: projects._id, title: projects.title, languages: projects.languages, overview: projects.overview, github: projects.github, website: projects.website, projectImg: "",
  })
  console.log(projectDetails);
  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)

  useEffect(() => {
    if (projectDetails.projectImg.type == "image/png" || projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == "image/jpeg") {
      // valid img
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    } else {
      // invalid img
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({ ...projectDetails, projectImg: "" })
    }
  }, [projectDetails.projectImg])

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      id: projects._id, title: projects.title, languages: projects.languages, overview: projects.overview, github: projects.github, website: projects.website, projectImg: ""
    })
  }
  const handleShow = () => {
    setShow(true);
    setProjectDetails({
      id: projects._id, title: projects.title, languages: projects.languages, overview: projects.overview, github: projects.github, website: projects.website, projectImg: ""
    })
  }

  const handleUpdateFunction = async () => {
    const { id, title, languages, overview, github, website, projectImg } = projectDetails
    if (title && languages && overview && github && website) {
      // api call - put(id, updatedetails)
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectImg", projectImg) : reqBody.append("projectImg", projects.projectImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        // api call 
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updateProjectAPI(id, reqBody, reqHeader)
          if (result.status == 200) {
            alert("Project Updated Successfully!!!")
            handleClose()
            setEditProjectResponse(result)
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Please fill the form completely")
      }
    }
  }
  return (
    <>

      <button className='btn' onClick={handleShow}><i className="fa-solid fa-edit"></i></button>

      {/* Modal */}
      <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} type="file" className='d-none' />
                <img src={preview ? preview : `${SERVER_URL}/uploads/${projects.projectImg}`} height={"200px"} className='img-fluid' alt="" />
              </label>
              {!imageFileStatus && <div className="text-warning fw-bolder my-2">*Upload Only The Following File Types (jpeg,  jpg, png) Here!!!</div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input type="text" value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} placeholder='Project Title' className='form-control' />
              </div>
              <div className="mb-2">
                <input type="text" value={projectDetails.languages} onChange={e => setProjectDetails({ ...projectDetails, languages: e.target.value })} placeholder='Languages Used In Project' className='form-control' />
              </div>
              <div className="mb-2">
                <input type="text" value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} placeholder='Project GitHub Link' className='form-control' />
              </div>
              <div className="mb-2">
                <input type="text" value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} placeholder='Project Website Link' className='form-control' />
              </div>
            </div>
          </div>
          <div className="my-2">
            <input type="text" value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} placeholder='Project Overview' className='form-control' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateFunction} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit