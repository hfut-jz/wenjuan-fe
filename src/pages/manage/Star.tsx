import React, {FC} from 'react'
import styles from './common.module.scss'
import QuestionCard from "../../components/QuestionCard";
import {useTitle} from "ahooks";
import ListSearch from "../../components/ListSearch";
import {Typography, Empty, Spin} from "antd";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";


const {Title} = Typography
const Star:FC=()=>{
    useTitle('小姜问卷-星标问卷')
    

    const {data={}, loading}=useLoadQuestionListData({isStar:true})
    const {list=[], total=0}=data
    if(loading)return  <Spin style={{ display: 'block', margin: 'auto', height: '100vh' }} />
     return <div>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>星标问卷</Title>
            </div>
            <div className={styles.right}><ListSearch></ListSearch></div>
        </div>
        <div className={styles.content}>
            {!loading&& list.length===0&&<Empty description={'暂无数据'}/>}
            {list.length>0&& list.map((q:any)=>{
                const {_id}=q
                return <QuestionCard key={_id} {...q}/>
            })}
        </div>
        <div className={styles.footer}>
            <ListPage total={total}></ListPage>
        </div>
    </div>
}
export default Star