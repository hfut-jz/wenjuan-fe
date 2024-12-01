import axios from 'axios'
import {message} from "antd";
import {getToken} from "../utils/user-token";

const instance= axios.create({
    timeout:10*1000
})
export default instance

//response拦截：统一处理errno和msg
instance.interceptors.response.use(res=>{
    //对其的所有传过来的信息进行解构
        const resData=(res.data || {}) as ResType
        const {errno,data,msg}=resData
        if(errno!==0){
            if(msg){
                message.error(msg)
            }
            throw new Error('请求失败'+msg)
        }
        return data as any
})
//request拦截：统一添加token
instance.interceptors.request.use(config=>{
    config.headers["Authorization"]=`Bear ${getToken()}`
    return config
},
    error => Promise.reject(error))


export type ResType={
    errno:number,
    data?:ResDataType
    msg?:string
}
export type ResDataType={
    [key:string]: any
}