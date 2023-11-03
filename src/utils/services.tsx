import axios, { AxiosError } from "axios"

export const api = axios.create({
    baseURL: 'http://localhost:3002/',

    /*headers: {
        Authorization: `${cookies["simacheck.idToken"]}`,
        AccessToken: `${cookies["simacheck.accessToken"]}`,

    },*/
});