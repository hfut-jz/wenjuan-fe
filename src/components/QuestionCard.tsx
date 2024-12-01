import React, {FC, useState} from 'react'
import {Button, Space, Divider, Tag, Popconfirm, Modal, message} from "antd";
import styles from './QuestionCard.module.scss'
import {EditOutlined, LineOutlined, StarOutlined, CopyOutlined, DeleteOutlined} from "@ant-design/icons";
import {Link, useNavigate,} from "react-router-dom";
import {useRequest} from "ahooks";
import {duplicateQuestionService, updateQuestionService,} from "../services/question";
//因此，在react中，抽离对象属性并且对其加入自定义是很必须的。
type PropsType = {
    _id: string,
    title: string,
    isStar: boolean,
    isPublished: boolean,
    answerCount: number,
    createAt: string
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const {
        _id,
        title,
        createAt,
        isStar,
        isPublished,
        answerCount
    } = props

    const nav = useNavigate()
    const del = () => {
        Modal.confirm({
            title: '确定删除吗',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                delQuestion()
            }
        })
    }
    //开发标星功能
    const [starState, setStarState] = useState(isStar)
    const {loading: starLoading, run: star} = useRequest(async () => {
        await updateQuestionService(_id, {isStar: !starState})
    }, {
        manual: true,
        onSuccess() {
            setStarState(!starState)
            message.success('修改成功')
        }
    })
    //箭头函数会默认返回执行结果
    const {loading: duplicateLoading, run: duplicate} = useRequest(async () => {
        const data = await duplicateQuestionService(_id)
        return data
    }, {
        manual: true,
        onSuccess(result) {
            message.success('复制成功')
            nav(`/question/edit/${result.id}`)
        }
    })
    //删除
    const [delState,setDelState]=useState(false)

    const {loading: delLoading, run: delQuestion} = useRequest(async () => {
        await updateQuestionService(_id,{isDelete:true})

    },{
        manual:true,
        onSuccess(){
            message.success('删除成功')
            setDelState(true)
        }
    })
    if(delState)return null
    else return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    {/*如果已经编辑了，那么就去编辑页，否则就去统计页*/}
                    <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
                        <Space>
                            {starState && <StarOutlined style={{color: 'red'}}/>}
                            {title}
                        </Space>
                    </Link>
                </div>
                <div className={styles.right}>
                    <Space>
                        {isPublished ? <Tag color={"green"}>已发布</Tag> : <Tag color={"orange"}>未发布</Tag>}
                        <span> 答卷数：{answerCount} </span>
                        <span>{createAt}</span>
                    </Space>
                </div>
            </div>
            <Divider type={'vertical'} style={{margin: '12px 0'}}/>
            <div className={styles.buttonContainer}>
                <div className={styles.buttonRight}>
                    <Space>
                        <Button
                            icon={<EditOutlined/>}
                            type={"text"}
                            size={'small'}
                            onClick={() => nav(`/question/edit/${_id}`)}
                        >编辑问卷</Button>
                        <Button
                            icon={<LineOutlined/>}
                            type={"text"}
                            size={'small'}
                            onClick={() => nav(`/question/stat/${_id}`)}
                            disabled={!isPublished}
                        >数据统计</Button>
                    </Space>
                </div>
                <div className={styles.buttonLeft}>
                    <Space>
                        <Button type={"text"}
                                icon={<StarOutlined/>}
                                onClick={() => star()} disabled={starLoading}>{starState ? '取消标星' : '标星'}</Button>
                        <Popconfirm title='确定复制吗'
                                    okText={'确定'}
                                    cancelText={'取消'}
                                    onConfirm={duplicate}>
                            <Button type={"text"} icon={<CopyOutlined/>} disabled={duplicateLoading}>复制链接</Button>
                        </Popconfirm>
                        <Button type={"text"} onClick={del} icon={<DeleteOutlined/>} disabled={delLoading}>删除</Button>
                    </Space>
                </div>
            </div>

        </div>
    )
}
export default QuestionCard