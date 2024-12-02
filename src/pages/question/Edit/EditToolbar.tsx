import React, {FC} from "react";
import {Button, Space, Tooltip} from "antd";
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined, DownOutlined,
    EyeInvisibleOutlined,
    LockOutlined, RedoOutlined, UndoOutlined,
    UpOutlined
} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    copyComponentProps,
    deleteComponentProps,
    hiddenComponentProps,
    lockedComponentProps, moveComponent, pasteComponentProps
} from "../../../store/componentsReducer";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import {ActionCreators as UndoActionCreators} from "redux-undo";

const EditToolbar: FC = () => {
    const dispatch=useDispatch()
    const {selectedId,componentList,selectedComponent,copiedComponent}=useGetComponentsInfo()
    const {isLocked}=selectedComponent || {}
    const selectIndex=componentList.findIndex(c=>c.fe_id===selectedId)
    const isFirst=selectIndex<=0
    const isLast=selectIndex+1===componentList.length
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
    function up(){
        dispatch(moveComponent({oldIndex:selectIndex,newIndex:selectIndex-1}))
    }
    function down(){
        dispatch(moveComponent({oldIndex:selectIndex,newIndex:selectIndex+1}))
    }
    function undo(){
        dispatch(UndoActionCreators.undo())
    }
    function redo(){
        dispatch(UndoActionCreators.redo())
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
            <Tooltip title={'上移'}>
                <Button
                    shape={'circle'}
                    icon={<UpOutlined/>}
                    onClick={up}
                    disabled={isFirst}
                ></Button>
            </Tooltip>
            <Tooltip title={'下移'}>
                <Button
                    shape={'circle'}
                    icon={<DownOutlined/>}
                    onClick={down}
                    disabled={isLast}
                >
                </Button>
            </Tooltip>
            <Tooltip title={'撤销'}>
                <Button
                    shape={'circle'}
                    icon={<UndoOutlined/>}
                    onClick={undo}
                    disabled={isLast}
                >
                </Button>
            </Tooltip>
            <Tooltip title={'重做'}>
                <Button
                    shape={'circle'}
                    icon={<RedoOutlined/>}
                    onClick={redo}
                    disabled={isLast}
                >
                </Button>
            </Tooltip>
        </Space>
    </div>
}
export default EditToolbar