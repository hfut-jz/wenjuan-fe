import React, {FC, useState} from 'react'
import {useRequest, useTitle} from "ahooks";
import {Typography, Empty, Table, Button, Space, Modal, message, Spin} from "antd";
import styles from './common.module.scss'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import {deleteQuestionService, updateQuestionService} from "../../services/question";

const {Title} = Typography
const {confirm} = Modal


const columns = [
    {title: '问卷名称', dataIndex: 'title'},
    {title: '创建时间', dataIndex: 'createAt'},
    {title: '答卷', dataIndex: 'answerCount'},]
type QuestionType = {
    _id: string;
    title: string;
    createAt: string;
    answerCount: number;
};
const Trash: FC = () => {
    useTitle('小姜问卷-回收站')
    const {
        data = {list: [] as QuestionType[], total: 0},
        loading,
        refresh
    } = useLoadQuestionListData({isDeleted: true});
    const {list = [], total = 0} = data
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const del = () => {
        confirm({
            title: '确定彻底删除问卷？',
            content: '删除后无法恢复',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                delSelects()
            }
        })
    }
    const {loading: recoverLoading, run: recover} = useRequest(async () => {
        for await (const id of selectedIds) {
            await updateQuestionService(id, {isDelete: true})
        }

    }, {
        manual: true,
        debounceWait: 500,
        onSuccess() {
            setSelectedIds([])
            message.info('恢复成功')
            refresh()
        }
    })
    const {loading: delLoading, run: delSelects} = useRequest(async () => {
        await deleteQuestionService(selectedIds)
    }, {
        manual: true,
        onSuccess() {
            message.success('删除成功')
            refresh()
            setSelectedIds([])
        }
    })
    const TableElement = (
        <>
            <div>
                <Space style={{marginBottom: '20px'}}>
                    <Button type='primary'
                            disabled={selectedIds.length === 0 || recoverLoading}
                            onClick={recover}
                    >恢复</Button>
                    <Button type={'primary'} disabled={selectedIds.length === 0||delLoading} danger onClick={del}>彻底删除</Button>
                </Space>
                <Table dataSource={list}
                       columns={columns}
                       pagination={false}
                       rowKey={(q: QuestionType) => q._id}
                       rowSelection={{
                           type: 'checkbox',
                           onChange: (selectedRowKeys) => {
                               setSelectedIds(selectedRowKeys as string[])
                           }
                       }}/>
            </div>
        </>
    )
    if(loading)return  <Spin style={{ display: 'block', margin: 'auto', height: '100vh' }} />
    else return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>回收站</Title>
            </div>
            <div className={styles.right}><ListSearch></ListSearch></div>
        </div>
        <div className={styles.content}>
            {list.length === 0 && < Empty description={'暂无数据'}/>}
            {list.length !== 0 && TableElement}
        </div>
        <div className={styles.footer}>
            <ListPage total={total}></ListPage>
        </div>
    </>
}
export default Trash