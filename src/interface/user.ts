export interface LoginReq{
    userName:string;
    terminal:0;
    password:string;
}
export interface RegisterReq{
    userName:string;
    password:string;
    nickName:string
}

export interface LoginRespVO{
    userName:string;
    terminal:0;
    password:string
}

export interface Result{
    code:number;
    message:string;
    data:any
}


