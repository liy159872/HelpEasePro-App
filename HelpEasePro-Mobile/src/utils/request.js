import axios from "axios"
import {Toast} from "vant"

const request = axios.create({
    baseURL: "/api",
    timeout: 5000,
    headers: {
        "Token": localStorage.getItem("uid")
    }
})

request.interceptors.response.use(
    //正常响应
    response => {
        const res = response.data
        if (!res.status) Toast.fail(res.message)
        return res
    },

    //响应错误
    error => {

    }
)

export default request

//
// 在上述代码中，baseURL字段指向的是代理服务器的地址，即http://10.38.24.157:8081，
// axios会自动将请求发送到代理服务器上，再由代理服务器转发请求到真正的 API 服务器上。
