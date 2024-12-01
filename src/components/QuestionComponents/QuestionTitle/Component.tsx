import React,{FC} from "react";
import {Typography} from "antd";
import {QuestionTitlePropsType,QuestionTitleDefaultProps} from "./interface";

const {Title}=Typography
//实际上组件库的props与这里的props有异曲同工之妙，都使用了默认属性来保证新增时有最基础的属性和样式
const QuestionTitle:FC<QuestionTitlePropsType>=(props:QuestionTitlePropsType)=>{
    const {text='',level=1,isCenter=false}={...QuestionTitleDefaultProps,...props}
    const genPageSize=(level:number)=>{
        if(level===1)return '24px'
        if(level===2)return '20px'
        if(level===3)return '16px'
        return '14px'
    }
    return(
        <Title level={level}  style={{
            textAlign:isCenter?'center':'left',
            marginBottom:'0',
            fontSize:genPageSize(level)}}>
            {text}
        </Title>
    )
}
export default QuestionTitle