import React, {ChangeEvent, FC, useState} from 'react'
import styles from './EditHeader.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, message, Space} from "antd";
import {EditOutlined, LeftOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {useDispatch} from "react-redux";
import {changeTitleInfo} from "../../../store/pageInfoReducer";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { useDebounceEffect, useKeyPress, useRequest} from "ahooks";
import { updateQuestionService} from "../../../services/question";

const {Title} = Typography
const TitleElem = () => {
    //要求1.获取标题信息，
    //2.修改标题到redux中
    const {title} = useGetPageInfo()
    const dispatch=useDispatch()
    const [changeTitle, setChangeTitle] = useState(false)
    function handleChangeTitle(){
        setChangeTitle(true)
    }
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const newTitle=e.target.value.trim()
        if(!newTitle)return
        dispatch(changeTitleInfo(newTitle))
    }
    return (<Space>
            {changeTitle&&<Input
                value={title}
                onPressEnter={()=>setChangeTitle(false)}
                onBlur={()=>setChangeTitle(false)}
                onChange={handleChange}></Input>}
            {!changeTitle&& <Title>{title}</Title>}
            <Button icon={<EditOutlined/>} type={'text'} onClick={handleChangeTitle}></Button>
    </Space>
    )
}


const SaveButton:FC=()=>{
    const {componentList}=useGetComponentsInfo()
    const pageInfo=useGetPageInfo()
    const {id}=useParams()
    const {loading,run:save}=useRequest(
        async ()=>{
            if(!id)return
           await updateQuestionService(id,{...pageInfo,componentList})
        },
        {manual:true}
    )
    useKeyPress(['ctrl.s','meta.s'],(event:KeyboardEvent)=>{
        //禁止网页默认行为
        event.preventDefault()
        if(!loading)save()
    })
    //自动保存，使用防抖
    // useDebounceEffect(()=>{
    //     save()
    // },
    //     [componentList,pageInfo],
    //     {
    //         wait:1000,
    //     })
   return( <Button onClick={save} disabled={loading}>保存</Button>)

}
const PublishButton=()=>{
    const nav=useNavigate()
    const {componentList}=useGetComponentsInfo()
    const pageInfo=useGetPageInfo()
    const {id}=useParams()
    const {loading,run:pub}=useRequest(
        async ()=>{
            if(!id)return
            await updateQuestionService(id,{...pageInfo,componentList,isPublished:true})
        },
        {
            manual:true,
            onSuccess(){
                message.success('发布成功')
                nav('/question/stat/'+id)}}
    )
   return( <Button type={'primary'} disabled={loading} onClick={pub}>发布</Button>)
}
const EditHeader: FC = () => {
    const nav = useNavigate()
    return <div className={styles.headerWrapper}>
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button type={'link'} icon={<LeftOutlined/>} onClick={() => nav(-1)}>返回</Button>
                    <TitleElem></TitleElem>
                </Space>
            </div>
            <div className={styles.main}><EditToolbar></EditToolbar></div>
            <div className={styles.right}>
                <Space>
                    <SaveButton></SaveButton>
                    <PublishButton></PublishButton>
                </Space>
            </div>
        </div>
    </div>
}
export default EditHeader