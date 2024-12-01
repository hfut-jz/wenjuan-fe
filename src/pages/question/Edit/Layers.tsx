import React, {FC, useState} from "react";
import classNames from "classnames";
import {Button, Input, message} from "antd";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { useDispatch } from "react-redux";
import {
    changeSelectedId,
    changeSelectedTitle,
    hiddenComponentProps,
    lockedComponentProps, moveComponent
} from "../../../store/componentsReducer";
import styles from "./Layers.module.scss";
import {EyeInvisibleOutlined, LockOutlined} from "@ant-design/icons";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
//
const Layers: FC = () => {
    // 获取在redux中的组件列表和选中的组件ID
    const { componentList, selectedId } = useGetComponentsInfo();
    const dispatch = useDispatch();

    // 点击选中组件
    //通过双击实现修改标题的操作
    const [changingTitleId, setChangingTitleId]=useState('')
    function handleTitleClick(fe_id: string) {
        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp?.isHidden) {
            message.info("该组件被隐藏，请先取消隐藏");
            return;
        }
        if (fe_id !== selectedId) {
            dispatch(changeSelectedId(fe_id));
            setChangingTitleId('')
            return
        }
        setChangingTitleId(fe_id)
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const newTitle=e.target.value.trim()
        if(!newTitle){
            return
        }
        if(!selectedId){
            return
        }
        dispatch(changeSelectedTitle({fe_id:selectedId,title:newTitle}))
    }
    const handleVisible=(fe_id:string,isHidden:boolean)=>{
        dispatch(hiddenComponentProps({fe_id:fe_id,isHidden:isHidden}))

    }
    const handleLocked=(fe_id:string)=>{
        dispatch(lockedComponentProps({fe_id:fe_id}))
    }
    //Sortable里每一个item添加id属性
    const componentListWithId=componentList.map(c=>{
        return {...c,id:c.fe_id}
    })
    //拖拽排序结束
    function handleDragEnd(oldIndex:number,newIndex:number){
        dispatch(moveComponent({oldIndex:oldIndex,newIndex:newIndex}))
    }

    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        <div className={styles.layersContainer}>
            {componentList.map((c) => {
                const { fe_id, title, isLocked, isHidden } = c;

                // 动态设置样式类名
                const titleClassName = classNames({
                    [styles.title]: true,
                    [styles.selected]: fe_id === selectedId,
                    [styles.hidden]: isHidden,
                    [styles.locked]: isLocked,
                });

                return (
                    <SortableItem key={fe_id} id={fe_id}>
                    <div  className={styles.wrapper}>
                        <div
                            className={titleClassName}
                            onClick={() => handleTitleClick(fe_id)}
                        >
                            {(fe_id===changingTitleId)&&<Input
                                value={title}
                                onChange={handleChange}
                                onPressEnter={()=>setChangingTitleId('')}
                                onBlur={()=>setChangingTitleId('')}></Input>}
                            {(fe_id!==changingTitleId)&&title}
                        </div>
                        <div className={styles.handler}>
                            <Button
                                onClick={()=>handleVisible(fe_id,!isHidden)}
                                icon={<EyeInvisibleOutlined/>}
                                type={isHidden?'primary':'default'}
                                className={!isHidden?styles.btn:''}
                                size={'small'}
                                shape={'circle'}
                            ></Button>
                            <Button
                                onClick={()=>handleLocked(fe_id)}
                                type={isLocked?'primary':'default'}
                                size={'small'}
                                shape={'circle'}
                                className={!isLocked?styles.btn:''}
                                icon={<LockOutlined/>}
                            ></Button>
                        </div>
                    </div>
                    </SortableItem>
                );
            })}
        </div>
        </SortableContainer>
    );
};

export default Layers;
