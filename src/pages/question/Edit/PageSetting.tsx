import React, {FC, useEffect} from "react";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {useDispatch} from "react-redux";
import {Form, Input} from "antd";
import {resetPageInfo} from "../../../store/pageInfoReducer";

const {TextArea}=Input

const PageSetting:FC=()=>{
    const pageInfo=useGetPageInfo()
    const dispatch=useDispatch()
    const [form]=Form.useForm()
    useEffect(() => {
        form.setFieldsValue(pageInfo)
    }, [pageInfo]);
    function handleChange(){
        const {title,js,css,desc}=form.getFieldsValue()
        dispatch(resetPageInfo({title,js,css,desc}))
    }
    return(
        <Form
            layout={'vertical'}
            initialValues={pageInfo}
            onValuesChange={handleChange}
            form={form}
        >
            <Form.Item label={'问卷标题'} name={'title'} rules={[{required:true,message:'标题信息'}]}>
                <Input placeholder={'请输入信息'}></Input>
            </Form.Item>
            <Form.Item label={'问卷描述'} name={'desc'}>
                <TextArea placeholder={'请输入信息'}></TextArea>
            </Form.Item>
            <Form.Item label={'样式代码'} name={'css'}>
                <TextArea placeholder={'请输入信息'}></TextArea>
            </Form.Item>
            <Form.Item label={'JS'} name={'js'}>
                <TextArea placeholder={'请输入信息'}></TextArea>
            </Form.Item>
        </Form>
    )

}
export default PageSetting