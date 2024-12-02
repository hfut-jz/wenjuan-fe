import React, {FC, useState} from 'react'
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {useTitle} from "ahooks";
import useLoadQuestionListData from "../../../hooks/useLoadQuestionListData";
import {Button, Result, Spin} from "antd";
import {MANAGE_LIST_PATH} from "../../../router";
import {useNavigate} from "react-router-dom";
import styles from './index.module.scss'
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageList from "./PageList";
import ChartStat from "./ChartStat";
const Stat:FC=()=>{
    const nav=useNavigate()
    const {title,isPublish}=useGetPageInfo()
    //从服务端加载数据,直接使用钩子函数useLoadQuestionData
    const {loading}=useLoadQuestionListData()

    const [selectedComponentId, setSelectedComponentId] = useState('')
    const [selectedComponentType, setSelectedComponentType] = useState('')
    useTitle(`问卷统计-${title}`)
    if(loading)return (
        <div style={{textAlign:"center",marginTop:"60px"}}>
            <Spin></Spin>
        </div>
    )
    if(isPublish){
        return<>
            <Result
                status="warning"
                title="未发布"
                subTitle="对不起，问卷还未发布"
                extra={<Button type="primary" onClick={()=>nav(MANAGE_LIST_PATH)}>返回首页</Button>}
            ></Result>
        </>
    }
    return(
        <div className={styles.container}>
            <StatHeader></StatHeader>
            <div className={styles['containerWrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}><ComponentList selectedComponentId={selectedComponentId}
                                                                setSelectedComponentId={setSelectedComponentId}
                                                                setSelectedComponentType={setSelectedComponentType}></ComponentList></div>
                    <div className={styles.main}><PageList selectedComponentId={selectedComponentId}
                                                           setSelectedComponentId={setSelectedComponentId}
                                                           setSelectedComponentType={setSelectedComponentType}></PageList></div>
                    <div className={styles.right}><ChartStat selectedComponentId={selectedComponentId} selectedComponentType={selectedComponentType}/></div>
                </div>
            </div>
        </div>
    )
}
export default Stat