import { http } from "../../../app/api/http"

export async function loginApi({ email, password }) {
    const res = await http.post('/auth/login', { email, password })
    return res.data?.data
}

export async function refreshApi() {
    const res = await http.post('auth/refresh-token')
    return res.data?.data
}

export async function logoutApi() {
    await http.post('auth/logout')
}