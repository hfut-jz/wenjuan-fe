import React, {FC, useState} from "react";
import {useRequest} from "ahooks";
import {getStatListService} from "../../../services/stat";
import {useParams} from "react-router-dom";
import {Pagination, Spin, Table} from "antd";
import {Typography} from "antd";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import {LIST_PAGE_SIZE} from "../../../constant";

const {Title} = Typography
type PropsType = {
    selectedComponentId: string;
    // eslint-disable-next-line no-unused-vars
    setSelectedComponentId: (id: string) => void;
    // eslint-disable-next-line no-unused-vars
    setSelectedComponentType: (type: string) => void;
};

type StatListItem = {
    id: string;
    name: string;
    // 根据实际数据结构补充字段
}
//使用组件完成
const PageList: FC<PropsType> = ({
                                     setSelectedComponentType,
                                     setSelectedComponentId,
                                     selectedComponentId,
                                 }) => {
    const [list, setList] = useState<StatListItem[]>([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
    const {id = ""} = useParams();

    const [total, setTotal] = useState(0)

    const {componentList} = useGetComponentsInfo()
    //使用columns组件进行展示
    const columns = componentList.map(c => {
        const {fe_id, title, props = {}, type} = c
        const colTitle = props!.title || title
        return {
            title: <div style={{cursor: "pointer"}} onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
            }}>
                <span style={{color: fe_id === selectedComponentId ? '#1890ff' : ''}}>{colTitle}</span>
            </div>,
            dataIndex: fe_id
        }
    })

    const {loading} = useRequest(
        async () => {
            const res = await getStatListService(id, {page: page, pageSize: pageSize})
            return res
        },
        {refreshDeps:[id, page, pageSize], 
                onSuccess(res) {
                const {total, list = []} = res
                setTotal(total)
                setList(list)
            },
            ready: !!id, // 防止无效请求
            onError: (err) => {
                console.error("Failed to fetch stat list:", err);
            },
        }
    );

    if (!id) {
        return <div>Please provide a valid ID.</div>;
    }
    const dataSource = list.map((i: any) => ({...i, key: i._id,}))
    const TableElem = (
    <div>
        <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
        <div style={{textAlign:"center",marginTop:'18PX'}}>
            <Pagination
            total={total}
            pageSize={pageSize}
            current={page}
            onChange={page=>setPage(page)}
            onShowSizeChange={(page,pageSize)=>{
                setPage(page)
                setPageSize(pageSize)
            }}
            />
        </div>
    </div>
    )
    return (
        <div>
            <Title level={3}>答卷数量: {total}</Title>
            {loading && (
                <div style={{textAlign: 'center'}}>
                    <Spin/>
                </div>
            )}
            {!loading && TableElem}
        </div>
    )
}
export default PageList;
