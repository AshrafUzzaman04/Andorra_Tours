import Axios from "axios";
import Cookies from "js-cookie";

const axios = Axios.create({
    baseURL: process.env.REACT_APP_STORAGE_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer 193|yxCfYj73aPQgzo1migejlxHEtcAaPTEpCT0JVvUe03ec6c8c"
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