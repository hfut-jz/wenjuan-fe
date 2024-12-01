import React, {FC, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "antd";
import {MANAGE_LIST_PATH} from "../router";
import styles from './Home.module.scss'
// import axios from "axios";
//使用antd组件库使得其进行使用
const {Title, Paragraph} = Typography
const Home: FC = () => {
    const nav = useNavigate()
    //React18后，useEffect会执行两次

    // function clickHandle() {
    //     nav({
    //         pathname: '/login',
    //         search: 'b=21'
    //     })
    // }
    //可以使用useEffect这种经典的写法，也可以使用fetch，更可以使用axios.get
    useEffect(()=>{
        //由于端口不一致，会导致跨域
        //对本地webpack进行代理，避免跨域
        // fetch('/api/test')
        //     .then(res=>res.json())
        //     .then(data=>console.log('fetch data',data))
        // axios.get('/api/test').then(res=>console.log('axios data',res.data))
    })
    return<div>
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>问卷调查|在线投票</Title>
                <Paragraph>已累计生成 XXX 问卷，累计收到 XXX 份调查结果，累计收到 XXX 份投票结果。</Paragraph>
                <div>
                    <Button type={"primary"} onClick={() => nav(MANAGE_LIST_PATH)}>开始使用</Button>
                </div>
            </div>
        </div>
    </div>
}
export default Home