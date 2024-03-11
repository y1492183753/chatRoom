import instance from "../utils/request";
import {IResponse} from "../interface/base"

// 调用后端的多环境测试接口
export const useEnvApi=()=>{
    return instance.get<any,IResponse<string>>("/env")
}

// 全局异常统一处理测试接口
export const useTestErrorApi=()=>{
    return instance.get<any,IResponse<string>>("/test-error")
}