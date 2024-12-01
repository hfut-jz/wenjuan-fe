import React,{FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_PATH} from "../router";
import {removeToken} from "../utils/user-token";
import {useDispatch} from "react-redux";
import {Button, message} from "antd";
import {logoutReducer} from "../store/userReducer";
import {UserOutlined} from "@ant-design/icons";
import {useRequest} from "ahooks";
import {getUserInfoService} from "../services/user";

const UserInfo:FC=()=>{
    const nav=useNavigate()
    const dispatch=useDispatch()
    //原因是因为此时store中根本没有存储用户信息，信息是从后端伪造的。
    const {data}=useRequest(getUserInfoService)
    const {username,nickname}=data||{}
    function logout(){
        dispatch(logoutReducer())
        removeToken()
        message.success('退出成功')
        nav(LOGIN_PATH)
    }
    const UserInfo=(
        <>
            <span style={{color: '#e8e8e8'}}>
        <UserOutlined/>
                {nickname}
      </span>
            <Button type="link" onClick={logout}>
                退出
            </Button>
        </>
    )
    const Login=<Link to={LOGIN_PATH}>登录</Link>
    return <div>{username?UserInfo:Login}</div>

}
export default UserInfo