import Axios from "axios";
import Cookies from "js-cookie";

const axios = Axios.create({
    baseURL: process.env.REACT_APP_STORAGE_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    },
    withCredentials: true,
    withXSRFToken: true,
});

const setBearerToken = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get("token")}`;
    console.log(Cookies.get("token"))
}
setBearerToken();
export default axios;