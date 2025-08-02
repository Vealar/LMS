import { instance } from "@/api/commonApi.js"

export const login = (credentials) =>
    instance.post("/auth/login", credentials).then(res => {
        localStorage.setItem("token", res.data.token)
        return res.data.user
    })

export const register = (data) =>
    instance.post("/auth/register", data).then(res => res.data.user)

export const getMe = () =>
    instance.get("/auth/me").then(res => res.data.user)
