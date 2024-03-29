import { IResponse } from "../interface/base";
import { LoginReq, RegisterReq ,LoginRespVO ,Result} from "../interface/user";
import instance from "../utils/request";

// 注册接口
export const userRegisterApi=(param:RegisterReq)=>{
   return instance.post<any,IResponse<Result>>("/register",param)
}

//登录接口
export const userLoginApi=(param:LoginReq)=>{
    return instance.post<any,IResponse<LoginRespVO>>("/login",param)
}