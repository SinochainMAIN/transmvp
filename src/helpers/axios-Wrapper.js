import {useTransStore} from "@/store/store.js";
import axios from 'axios';


const token = localStorage.getItem('myToken')


export const axiosWrapper = {
    get: request('GET'),
    post: request('POST'),
}

function request(method)  {
    return (url, body) => {
        const requestOptions = {
            url: url,
            method,
            data: body
        };

        return axios(requestOptions)
    }
}

const authHeader = (url) => {
    const { userData } = useTransStore();
    const isLoggedIn = !!userData?.token;
    const isApiUrl = 'http://79.143.30.65/auth/users/me/'

}