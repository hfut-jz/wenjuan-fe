import React,{FC} from "react";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import {ComponentPropsType, getComponentConfByType} from "../../../components/QuestionComponents";
import {changeComponentProps, ComponentInfoType} from "../../../store/componentsReducer";
import {useDispatch} from "react-redux";

const NoProp:FC=()=>{
    return <div style={{textAlign:'center'}}>NoProp</div>
}
//将修改的内容同步到store中
const ComponentProp:FC=()=>{
    const {selectedComponent}=useGetComponentsInfo()
    const dispatch=useDispatch()
    if (!selectedComponent)return <NoProp></NoProp>
    const {type,props,isLocked}=selectedComponent
    const ComponentConf=getComponentConfByType(type)
    if(ComponentConf==null)return <NoProp></NoProp>

    function changeEvents(newProps:ComponentPropsType){
        if(selectedComponent===null)return
        const {fe_id}=selectedComponent as ComponentInfoType
        console.log(newProps)
        dispatch(changeComponentProps({fe_id,newProps}))

    }
    const {PropComponent}=ComponentConf
    return <PropComponent onChange={changeEvents} {...props} disabled={isLocked||false}></PropComponent>
}
export default ComponentProp