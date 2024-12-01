import React, {FC, useState} from 'react'
import {Outlet} from "react-router-dom";
import styles from './ManageLayout.module.scss'
import {Button, Space, Divider, message} from 'antd'
import {PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined} from "@ant-design/icons";
import {useNavigate, useLocation} from "react-router-dom";
import {createQuestionService} from "../services/question";
import {useRequest} from "ahooks";

const ManageLayout: FC = () => {
    const nav = useNavigate()
    const {pathname} = useLocation()
    // const [loading,setLoading]=useState(true)
    const {loading,error,run:handleCreateClick}=useRequest(createQuestionService,{manual:true,
    onSuccess:(result)=>{
        nav(`/question/edit/${result.id}`)
        message.success('创建问卷成功')
    }
    })
    // async function handleCreateClick() {
    //     const data=await createQuestionService()
    //     const {id}=data ||{}
    //     if(id){
    //         nav(`/question/edit/${id}`)
    //         message.success('创建问卷成功')
    //     }
    //     setLoading(false)
    // }

    return <div>
        <div className={styles.container}>
            <div className={styles.left}>
                <Space direction={'vertical'}>
                    <Button type='primary'
                            size='large'
                            icon={<PlusOutlined/>}
                            disabled={loading}
                            onClick={handleCreateClick}>新建问卷
                    </Button>
                    <Divider style={{borderTop: 'transparent'}}/>
                    <Button type={pathname === '/manage/list' ? 'primary' : 'default'}
                            size='large'
                            icon={<BarsOutlined/>}
                            onClick={() => nav(`/manage/list`)}>我的问卷
                    </Button>
                    <Divider style={{borderTop: 'transparent'}}/>
                    <Button type={pathname === '/manage/star' ? 'primary' : 'default'}
                            icon={<StarOutlined/>}
                            onClick={() => nav(`/manage/star`)}>收藏夹
                    </Button>
                    <Divider style={{borderTop: 'transparent'}}/>
                    <Button type={pathname === '/manage/trash' ? 'primary' : 'default'}
                            icon={<DeleteOutlined/>}
                            onClick={() => nav(`/manage/trash`)}>回收站
                    </Button>
                    <Divider style={{borderTop: 'transparent'}}/>
                </Space>
            </div>
            <div className={styles.right}>
                <Outlet></Outlet>
            </div>
        </div>
    </div>
}
export default ManageLayout