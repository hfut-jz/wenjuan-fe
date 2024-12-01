import React, {FC, } from 'react'
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from './index.module.scss'
import EditCanvas from "./EditCanvas";
import {useDispatch} from "react-redux";
import {changeSelectedId} from "../../../store/componentsReducer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";
//帮助其获取动态路由
//从容易到困难，先从Title和Input开始
const Edit:FC=()=>{
    const {loading}=useLoadQuestionData()
    const dispatch=useDispatch()
    function clearSelectedId(){
        dispatch(changeSelectedId(''))
    }
    return(
        <div className={styles.container} >
            <div style={{backgroundColor:'#fff',height:'30px'}}><EditHeader></EditHeader></div>
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel></LeftPanel>
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles.canvasWrapper}>
                            <EditCanvas loading={loading}/>
                        </div>
                    </div>
                    <div className={styles.right}><RightPanel></RightPanel></div>
                </div>
            </div>

        </div>
    )
}
export default Edit