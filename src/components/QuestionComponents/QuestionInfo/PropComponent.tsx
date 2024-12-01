import React, {FC, useEffect} from "react";
import {QuestionInfoType} from "./interface";
import {Form, Input} from "antd";

const {TextArea}=Input
 const PropComponent:FC<QuestionInfoType>=(props)=>{
    const {onChange,desc,title}=props
    const [form]=Form.useForm()

    useEffect(() => {
        form.setFieldsValue({title,desc})
    }, [title,desc]);
    const handleValuesChange=()=>{
        if(onChange){
            onChange(form.getFieldsValue())
        }
    }
    return(
        <Form
            layout='vertical'
            initialValues={{title,desc}}
            onValuesChange={handleValuesChange}
            form={form}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{required:true,message:'请输入文本内容'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item label="描述" name="desc">
                <TextArea />
            </Form.Item>
        </Form>
    )
}
export default PropComponent