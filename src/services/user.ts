import axios,{ResDataType} from "./ajax";


// 获取用户信息
export async function getUserInfoService():Promise<ResDataType>{
    const url='/api/user/info'
    const data=(await axios.get(url)) as ResDataType
    return data
}
export async function registerService(opt:{username:string,password:string,nickname?:string}):Promise<ResDataType>{
    const url='/api/user/register'
    const body={username:opt.username,password:opt.password,nickname:opt.nickname||opt.username}
    const data=(await axios.post(url,body)) as ResDataType
    return data
}
export async function loginService(opt:{username:string,password:string}):Promise<ResDataType>{
    const url='/api/user/login'
    const body={username:opt.username,password:opt.password}
    const data=(await axios.post(url,body)) as ResDataType
    return data
}