import {useSelector} from "react-redux";
import {StateType} from "../store";


function useGetUserInfo(){
    const {username,nickname}=useSelector<StateType>((state )=>state.user) as {username:string,nickname:string}
    return {username,nickname}
}
export default useGetUserInfo