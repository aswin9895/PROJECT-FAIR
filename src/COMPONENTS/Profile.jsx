import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import profileImg from '../assets/happy-father-s-day-cookies-father-s-day-isolated-white-background.png'
import SERVER_URL from '../SERVICE/serverUrl'
import { updateUserAPI } from '../SERVICE/allPI'

const Profile = () => {
  const [preview, setPreview] = useState("")
  const [existingProfileImage, setExistingProfileImage] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profilePic: ""
  })
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin
      })
      setExistingProfileImage(user.profilePic)
    }
  }, [open])

  useEffect(() => {
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic))
    } else {
      setPreview("")
    }
  }, [userDetails.profilePic])

  const handleUpdateProfile = async () => {
    const { username, email, password, github, linkedin, profilePic } = userDetails
    if (linkedin && github) {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profilePic", profilePic) : reqBody.append("profilePic", existingProfileImage)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // api call
        try {
          const result = await updateUserAPI(reqBody, reqHeader)
          if (result.status == 200) {
            alert("User Profile Updated Successfully!!!")
            sessionStorage.setItem("user", JSON.stringify(result.data))
            setOpen(!open)
          } else {
            console.log(result);
          }
        } catch (error) {
          console.log(error);

        }

      } else {
        alert("please Fill The Form Completely!!!")
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <h3 className="text-warning">Profile</h3>
        <button onClick={() => setOpen(!open)} className="btn text-warning"><i className="fa-solid fa-chevron-down"></i></button>
      </div>
      {/* collapse */}
      <Collapse in={open}>
        <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">
          <label className="text-center">
            <input onChange={e => setUserDetails({ ...userDetails, profilePic: e.target.files[0] })} type="file" className='d-none' />
            {
              existingProfileImage == "" ?
                <img width={"200px"} height={"200px"} className='rounded-circle' src={preview ? preview : profileImg} alt="" />
                :
                <img width={"200px"} height={"200px"} className='rounded-circle' src={`${SERVER_URL}/uploads/${existingProfileImage}`} alt="" />

            }
          </label>
          <div className="mb-2 mt-2 w-100">
            <input value={userDetails.github} onChange={e => setUserDetails({ ...userDetails, github: e.target.value })} type="text" placeholder='User GITHUB PROFILE Link' className="form-control" />
          </div>
          <div className="mb-2 w-100">
            <input value={userDetails.linkedin} onChange={e => setUserDetails({ ...userDetails, linkedin: e.target.value })} type="text" placeholder='User LINKEDIN PROFILE Link' className="form-control" />
          </div>
          <div className="d-grid w-100">
            <button onClick={handleUpdateProfile} className="btn btn-warning">Update Profile</button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile