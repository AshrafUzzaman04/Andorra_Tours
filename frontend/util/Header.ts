import Axios from "@/helper/axios";

export const GetHeaderData = async () => {
    "use server"
    const res = await Axios.get('/header');
	return res?.data?.data;
}