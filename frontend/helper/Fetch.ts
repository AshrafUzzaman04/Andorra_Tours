import axios from "axios";

const Fetch = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URI,
    headers:{
        Accept: "application/json",
        Authorization: "Bearer "+process.env.NEXT_PUBLIC_API_AUTH_KEY
    }
})

export default Fetch;