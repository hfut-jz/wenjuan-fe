//定义组件的属性
import React, {FC, useEffect} from "react";
import {Checkbox, Form, Input} from "antd";
import {QuestionParagraphPropsType} from "./interface";

const {TextArea}=Input

const PropComponent:FC<QuestionParagraphPropsType>=(props:QuestionParagraphPropsType)=>{
    const {text,isCenter,onChange,disabled}=props
    const [form]=Form.useForm()

    useEffect(() => {
        form.setFieldsValue({text,isCenter})
    }, [text,isCenter]);

    function handleChange(){
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }
    //一般开发流程就是这样的，将其变为完全受控组件，使用form表示其的属性
    return(
       <Form
           layout={'vertical'}
           initialValues={{text,isCenter}}
           onValuesChange={handleChange}
           disabled={disabled}
           form={form}
           >
           <Form.Item
           label={'段落内容'}
           name={'text'}
           rules={[{required:true,message:'请输入段落内容'}]}
           >
               <TextArea></TextArea>
           </Form.Item>
           <Form.Item name={'isCenter'} valuePropName={'checked'}>
               <Checkbox>居中显示</Checkbox>
           </Form.Item>
       </Form>
    )
}
export default PropComponent