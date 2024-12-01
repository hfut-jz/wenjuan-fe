import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import {isLoginOrRegisterPath, isNoNeedUserInfo, LOGIN_PATH, MANAGE_LIST_PATH} from "../router";

function useNavPage(waitingUserData:boolean){
    const {username}=useGetUserInfo()
    const {pathname}=useLocation()
    const nav=useNavigate()
    useEffect(() => {
        if(waitingUserData) return
        if(username){
            if(isLoginOrRegisterPath(pathname)){
                nav(MANAGE_LIST_PATH)
            }
            return
        }
        // 未登录
        if(isNoNeedUserInfo(pathname)){
            return }
            else{
                nav(LOGIN_PATH)
            }


    }, [username,pathname]);
}
export default useNavPage
