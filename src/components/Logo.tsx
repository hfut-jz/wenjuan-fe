import React, {FC, useEffect} from "react";
import {Space, Typography} from "antd";
import {FormOutlined} from "@ant-design/icons";
import styles from './Logo.module.scss'
import {Link} from "react-router-dom";
import useGetUserInfo from "../hooks/useGetUserInfo";
import {MANAGE_LIST_PATH} from "../router";

const {Title} = Typography


const Logo: FC = () => {
    const {username}=useGetUserInfo()
    const [pathname,setPathname]=React.useState('/')
    useEffect(() => {
        if(username){
            setPathname(MANAGE_LIST_PATH)
        }
    }, [username]);

    return <div className={styles.container}>
        <Link to={'/'}>
            <Space>
                <Title>
                    <FormOutlined/>
                </Title>
                <Title>小姜问卷</Title>
            </Space>
        </Link>
    </div>
}
export default Logo