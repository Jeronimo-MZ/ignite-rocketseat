import { signOut } from "@/contexts/auth-context";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies, setCookie } from "nookies";
import { AuthTokenError } from "./errors/auth-token-error";

type FailedRequest = {
    onSuccess: (token: string) => void;
    onFailure: (err: AxiosError) => void;
};

let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

export function setupApiClient(ctx?: GetServerSidePropsContext) {
    let cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: "http://localhost:3333/",
        headers: {
            Authorization: `Bearer ${cookies["next-auth.token"]}`,
        },
    });

    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError<{ code?: string }>) => {
            if (error.response?.status === 401) {
                if (error.response.data?.code === "token.expired") {
                    cookies = parseCookies(ctx);
                    const { "next-auth.refresh-token": refreshToken } = cookies;
                    const originalConfig =
                        error.config as InternalAxiosRequestConfig;
                    if (!isRefreshing) {
                        isRefreshing = true;
                        api.post("/refresh", { refreshToken })
                            .then((response) => {
                                const { token } = response.data;

                                setCookie(ctx, "next-auth.token", token, {
                                    maxAge: 60 * 60 * 24 * 30, //30 days
                                    path: "/",
                                });
                                setCookie(
                                    ctx,
                                    "next-auth.refresh-token",
                                    response.data.refreshToken,
                                    {
                                        maxAge: 60 * 60 * 24 * 30,
                                        path: "/",
                                    }
                                );
                                api.defaults.headers[
                                    "Authorization"
                                ] = `Bearer ${token}`;
                                failedRequestsQueue.forEach((request) =>
                                    request.onSuccess(token)
                                );
                                failedRequestsQueue = [];
                            })
                            .catch((err) => {
                                failedRequestsQueue.forEach((request) =>
                                    request.onFailure(err)
                                );
                                failedRequestsQueue = [];
                                if (typeof window !== "undefined") {
                                    signOut();
                                } else {
                                    return Promise.reject(new AuthTokenError());
                                }
                            })
                            .finally(() => {
                                isRefreshing = false;
                            });
                    }
                    return new Promise((resolve, reject) => {
                        failedRequestsQueue.push({
                            onSuccess: (token: string) => {
                                originalConfig.headers[
                                    "Authorization"
                                ] = `Bearer ${token}`;
                                resolve(api(originalConfig));
                            },
                            onFailure: (err: AxiosError) => {
                                reject(err);
                            },
                        });
                    });
                } else {
                    if (typeof window !== "undefined") {
                        signOut();
                    } else {
                        return Promise.reject(new AuthTokenError());
                    }
                }
            }
            return Promise.reject(error);
        }
    );
    return api;
}

export const api = setupApiClient();
