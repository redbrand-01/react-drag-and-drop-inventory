import axios from 'axios'


const host = "http://localhost:4000/api"
export const gettable = host + "/gettable"
export const updatetable = host + "/updatetable"
export const deletetable = host + "/deletetable"

export const Axios = async (method, url, data) => { // универсальный зарпрос на сервер

    const res = await axios({
        method: method,
        url: url,
        data: data
    })
    .then(res => {
        return res.data
    })
    .catch(() => {
        return false
    })
    
    return res
}