import { IResponse } from "../interface/base";
import { LoginReq, RegisterReq ,LoginRespVO} from "../interface/user";
import instance from "../utils/request";

// 注册接口
export const userRegisterApi=(param:RegisterReq)=>{
   return instance.post<any,IResponse<any>>("/api/user/register",param)
}

//登录接口
export const userLoginApi=(param:LoginReq)=>{
    return instance.post<any,IResponse<LoginRespVO>>("/api/user/login",param)
}