import React,{FC} from 'react'
import {Outlet} from "react-router-dom";
import {Layout} from "antd";
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from "../components/UserInfo";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";

const {Header,Content,Footer}=Layout
const MainLayout:FC=()=>{
    const {waitingUserData}=useLoadUserData()
    useNavPage(waitingUserData)
    return <div>
        <Header className={styles.header}>
            <div className={styles.left}><Logo/></div>
            <div className={styles.right}><UserInfo/></div>
        </Header>
        <Content className={styles.main}>
            { waitingUserData && <Outlet></Outlet>}
        </Content>

        <Footer className={styles.footer}>
            小姜问卷 & copyright@2024 -created by 姜
        </Footer>
    </div>
}
export default MainLayout