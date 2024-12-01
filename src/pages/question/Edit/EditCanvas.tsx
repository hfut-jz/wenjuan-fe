import React, {FC} from "react";
import styles from './EditCanvas.module.scss'
import {Spin} from "antd";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import {ComponentInfoType, moveComponent} from "../../../store/componentsReducer";
import {getComponentConfByType} from "../../../components/QuestionComponents";
import {changeSelectedId} from "../../../store/componentsReducer";
import {useDispatch} from "react-redux";
import classNames from 'classnames'
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

type PropsType={
    loading:boolean
}
//不再静态，而是动态的从服务端的来获取数据
function genComponent(componentInfo:ComponentInfoType){
    const {type,props}=componentInfo
    //获取其的组件库
    const componentConf=getComponentConfByType(type)
    if(componentConf==null)return null
    const {Component}=componentConf
    return <Component {...props}></Component>
}
const EditCanvas:FC<PropsType>=(props)=>{
    //根据 传过来的loading作判断。如果loading，就显示loading动画，否则就显示组件
    const {loading}=props
    const {componentList,selectedId}=useGetComponentsInfo()
    const dispatch=useDispatch()
    function handleClick(event: React.MouseEvent<HTMLDivElement>,id:string){
        event.stopPropagation()
        dispatch(changeSelectedId(id))
    }
    useBindCanvasKeyPress()
    if(loading){
        return (<div style={{textAlign:'center',marginTop:'24px'}}>
            <Spin></Spin>
        </div>)
    }
    function handleDrag(oldIndex:number,newIndex:number){
        dispatch(moveComponent({oldIndex,newIndex}))
    }
    const componentListWithId=componentList.map(c=>{
        return {...c,id:c.fe_id}
    })
    return<SortableContainer items={componentListWithId} onDragEnd={handleDrag}>
    <div className={styles.canvasWrapper}>
        {componentList.filter(c=>!c.isHidden).map(c=>{
            const {fe_id,isLocked}=c
            //对classnames进行拼接
            const wrapperDefaultClassName=styles['componentWrapper']
            const selectedClassName=styles.selected
            const lockedClassName=styles.locked
            const wrapperClassName=classNames({
                [wrapperDefaultClassName]:true,
                [selectedClassName]:fe_id===selectedId,
                [lockedClassName]:isLocked
            })

            return <SortableItem id={fe_id} key={fe_id}>
                    <div key={fe_id} className={wrapperClassName} onClick={(e)=>handleClick(e,fe_id)} >
                        {genComponent(c)}
                </div>
            </SortableItem>
        })}
    </div>
    </SortableContainer>
}
export default EditCanvas