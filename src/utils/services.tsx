import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "cookies-next";
import { signOut } from "./functions";
import { headers } from "next/headers";

let isRefreshing = false;
let failedRequestQueue: {
  onSucess: ({ AccessToken, IdToken }: onSucessProps) => void;
  onFail: (err: AxiosError<unknown, any>) => void;
}[] = [];

interface onSucessProps {
  AccessToken: string;
  IdToken: string;
}

const cookieExists = getCookie("mem.idToken");

export const api = axios.create({
  // baseURL: 'http://localhost:3002/',
  baseURL: "https://dev.meuestagiomed.com.br/",
  headers: cookieExists
    ? {
        Authorization: `${getCookie("mem.idToken")}`,
        AccessToken: `${getCookie("mem.accessToken")}`,
      }
    : {},
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("REFRESH TOKEN ATIVADO", error.response.data.Message, error);
    if (error.response?.status == 401) {
      let mensage = error.response.data.Message;
      console.log(mensage !== "The password is incorrect");
      const acessToken = getCookie("mem.accessToken");
      const refreshToken = getCookie("mem.refreshToken");

      if (
        mensage === "Access Token Expired" ||
        mensage === "The incoming token has expired"
      ) {
        console.log("bateu aqui veio");

        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          await api
            .post(
              "/auth/refresh",
              {},
              {
                headers: {
                  RefreshToken: refreshToken,
                  AcessToken: acessToken
                },
              }
            )
            .then((response) => {
              const { AccessToken, IdToken } = response.data;
              console.log("refresh deu certo");
              setCookie("simacheck.accessToken", AccessToken, {
                maxAge: 60 * 60 * 24 * 30, // 30days
                path: "/",
              });

              api.defaults.headers.common["Authorization"] = IdToken;
              api.defaults.headers.common["AccessToken"] = AccessToken;

              let data = { IdToken, AccessToken };

              failedRequestQueue.forEach((request) => request.onSucess(data));
            })
            .catch((err) => {
              failedRequestQueue.forEach((request) => request.onFail(err));
              failedRequestQueue = [];

              if (process.browser) {
                signOut();
                console.log("refresh deu errado");
              }
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSucess: ({ AccessToken, IdToken }: onSucessProps) => {
              originalConfig.headers["Authorization"] = IdToken;
              originalConfig.headers["AccessToken"] = AccessToken;

              resolve(api(originalConfig));
            },
            onFail: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else if (!mensage || mensage !== "The password is incorrect") {
        console.log(
          "tem que cair aqui quando for 401 e nao for esqueci a senha"
        );
        signOut();
      }

      //apagar depois
      if (!isRefreshing) {
        isRefreshing = true;

        await api
          .post(
            "/auth/refresh",
            {},
            {
              headers: {
                RefreshToken: refreshToken,
                AcessToken: acessToken
              },
            }
          )
          .then((response) => {
            const { AccessToken, IdToken } = response.data;
            console.log("refresh deu certo");
            setCookie("simacheck.accessToken", AccessToken, {
              maxAge: 60 * 60 * 24 * 30, // 30days
              path: "/",
            });

            api.defaults.headers.common["Authorization"] = IdToken;
            api.defaults.headers.common["AccessToken"] = AccessToken;

            let data = { IdToken, AccessToken };

            failedRequestQueue.forEach((request) => request.onSucess(data));
          })
          .catch((err) => {
            failedRequestQueue.forEach((request) => request.onFail(err));
            failedRequestQueue = [];

            if (process.browser) {
              signOut();
              console.log("refresh deu errado");
            }
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
    }

    return Promise.reject(error);
  }
);
