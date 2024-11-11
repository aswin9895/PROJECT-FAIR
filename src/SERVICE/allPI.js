import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// registerAPI called by Auth component when user click register btn
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// loginAPI called by Auth component when user click register btn
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login `, reqBody)
}

// addProjectAPI called by add component when user click add btn add-project
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/add-project `, reqBody, reqHeader)
}

// getHomeProjectAPI called by home component when page loaded in browser(useEffect)
export const getHomeProjectAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/home-project `, {})
}

// getAllProjectAPI called by project component when page loaded in browser(useEffect)
export const getAllProjectAPI = async (searchKey, reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/all-projects?search=${searchKey} `, {}, reqHeader)
}

// userProjectAPI called by view component when page loaded in browser(useEffect)
export const userProjectAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/user-projects`, {}, reqHeader)
}

// updateProjectAPI called by edit component when use click update btn projects/6728783805644f45ef8c411d/edit
export const updateProjectAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/projects/${id}/edit`, reqBody, reqHeader)
}

// userProjectRemoveAPI called by view component when user delete btn clicked
export const userProjectRemoveAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/projects/${id}/remove`, {}, reqHeader)
}

// updateUserAPI called by Profile component when user click update btn edit-user
export const updateUserAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/edit-user`, reqBody, reqHeader)
}