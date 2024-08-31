import axios from "axios";

const Axios = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    headers:{
        Accept: "application/json",
        Authorization: "Bearer "+process.env.NEXT_PUBLIC_API_AUTH_KEY
    }
})

export default Axios;