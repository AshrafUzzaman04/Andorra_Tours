import Axios from "axios";
import Cookies from "js-cookie";

const axios = Axios.create({
    baseURL: process.env.REACT_APP_STORAGE_URL, // Corrected to baseURL
    headers: {
        "Authorization": `Bearer ${Cookies.get("token")}`
    },
    withCredentials: true, // Ensure cookies like XSRF-TOKEN are sent with requests
});

// Optional: Function to dynamically set the Bearer token if needed
const setBearerToken = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get("token")}`;
}
setBearerToken();
export default axios;