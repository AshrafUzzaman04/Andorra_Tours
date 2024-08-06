import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export function callFetch(urlSegment, fetchMethod, data, setError) {
    if (!urlSegment || !fetchMethod)
        return {};

    let bodyData = makeFormData(fetchMethod, data);
    let isOk = null;
    return fetch(process.env.REACT_APP_API_URL + urlSegment, bodyData)
        .then(res => {
            isOk = res.ok;
            return res.json();
        })
        .then(resData => {
            if (!isOk && resData.errors) {
                showServerErrors(setError, resData.errors);
                //toast.error(resData.message);
            }
            else {
                if (fetchMethod !== 'GET' && urlSegment !== 'signin' && urlSegment.split('?')[1] !== 'toast=false'){
                    //toast.success(resData.message);
                }
            }
            resData.ok = isOk;
            return resData;
        });
}

function makeFormData(fetchMethod, data) {
    let formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
        if (value instanceof FileList) {
            if (typeof value[0] !== 'undefined')
                formData.append(key, value[0]);
        }
        else
            formData.append(key, value);
    }

    let bodyData = {
        method: fetchMethod,
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + Cookies.get('token')
        }
    };
    if (fetchMethod !== 'GET')
        bodyData.body = formData;
    return bodyData;
}

function showServerErrors(setError, errorData) {
    if (!setError)
        return;

    for (let [key, value] of Object.entries(errorData)) {
        setError(key, {
            type: "server",
            message: value[0]
        });
        if (document.querySelector("*[name='" + key + "']"))
            document.querySelector("*[name='" + key + "']").setCustomValidity('invalid');
    }
}

export default callFetch;
