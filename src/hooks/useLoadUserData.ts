import {useEffect,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useGetUserInfo from "./useGetUserInfo";
import {getUserInfoService} from "../services/user";
import {useRequest} from "ahooks";
import {loginReducer} from "../store/userReducer";

function useLoadUserData(){
    //判断等待用户数据是否完成
    const [waitingUserData,setWattingUserData]=useState(true)
    const dispatch =useDispatch()
    //ajax加载用户请求
    const {run}=useRequest(getUserInfoService,{
        manual:true,
        onSuccess(result){
            const {username,nickname}=result
            dispatch(loginReducer({username,nickname}))
        },
        onFinally(){
            setWattingUserData(false)
        }
    })
    const {username}=useGetUserInfo()
    useEffect(() => {
        if(username){
            setWattingUserData(false)//如果存在就不重新加载了
        }
    }, []);
    return {waitingUserData}
}
export default useLoadUserData