import React, {FC} from "react";
import {Button, Space, Tooltip} from "antd";
import {BlockOutlined, CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    copyComponentProps,
    deleteComponentProps,
    hiddenComponentProps,
    lockedComponentProps, pasteComponentProps
} from "../../../store/componentsReducer";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";

const EditToolbar: FC = () => {
    const dispatch=useDispatch()
    const {selectedId,selectedComponent,copiedComponent}=useGetComponentsInfo()
    const {isLocked}=selectedComponent || {}
    function handleDelete() {
        dispatch(deleteComponentProps())
    }
    function handleHidden(){
        dispatch(hiddenComponentProps({fe_id:selectedId,isHidden:true}))
    }
    function handleLocked(){
        dispatch(lockedComponentProps({fe_id:selectedId}))
    }
    function copy(){
        dispatch(copyComponentProps())
    }
    function paste(){
        dispatch(pasteComponentProps())
    }

    return <div>
        <Space>
            <Tooltip title={'删除'}>
                <Button shape={'circle'} onClick={handleDelete} icon={<DeleteOutlined/>}></Button>
            </Tooltip>
            <Tooltip title={'隐藏'}>
                <Button shape={'circle'} onClick={handleHidden} icon={<EyeInvisibleOutlined/>}></Button>
            </Tooltip>
            <Tooltip title={'锁定'}>
                <Button shape={'circle'} onClick={handleLocked} icon={<LockOutlined/>}
                type={isLocked?'primary':'default'}
                ></Button>
            </Tooltip>
            <Tooltip title="复制">
                <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
            </Tooltip>
            <Tooltip title="粘贴">
                <Button
                    shape="circle"
                    icon={<BlockOutlined />}
                    onClick={paste}
                    disabled={copiedComponent == null}
                ></Button>
            </Tooltip>
        </Space>
    </div>
}
export default EditToolbar