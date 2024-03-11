import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import router from "../router";
const instance = axios.create({
    timeout:6000,
    headers:{"Content-Type":"application/json"},
    baseURL:'/dev'
})

//拦截器（直接拿到后端的业务数据）
instance.interceptors.response.use((Response:AxiosResponse)=>{
    if(Response.status===200){
        if(Response.data.code===0){
            return Response.data
        }
        ElMessage.error(Response.data.message)
    }
    return Promise.reject(Response.statusText)
},(error)=>{
    ElMessage.error(error.message)
    if(error.response.status===500){
        console.log("报错500");
        
        // router.push("/404")
    }

    return Promise.reject(error.message);
})
export default instance