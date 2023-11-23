import axios, { AxiosError } from "axios";
import { getCookie } from 'cookies-next';

export const api = axios.create({
    baseURL: 'http://localhost:3002/',

    headers: {
        Authorization: `${getCookie("mem.idToken")}`,
        AccessToken: `${getCookie("mem.accessToken")}`,

    },
});