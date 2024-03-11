export interface LoginReq{
    username:string;
    password:string;
}
export interface RegisterReq{
    username:string
    password:string
    email:string
}

export interface LoginRespVO{
    id:string;
    username:string;
    token:string;
}