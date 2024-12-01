import React, {FC, useEffect} from "react";
import {Button, Checkbox, Form, Input, Select, Space} from "antd";
import {OptionType, QuestionRadioPropsType} from "./interface";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {nanoid} from "@reduxjs/toolkit";

const PropComponent: FC<QuestionRadioPropsType> = (props) => {
    const {disabled, onChange, value,title, isVertical, options = []} = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({title, isVertical, options})
    }, [title, isVertical, options]);

    function handleValueChange() {
        if (onChange) {
            //由于value会被置为空，因此不能随便轻易的设
            const newValues=form.getFieldsValue() as QuestionRadioPropsType
            if(newValues.options){
                //由于删除变成了undefined，因此需要对undifine进行清除
                newValues.options=newValues.options.filter(opt=>!(opt.text==null))
            }
            const {options=[]}=newValues
            options.forEach(opt=>{
                if(opt.value)return
                opt.value=nanoid(5)
            })
            onChange(newValues)
        }
    }

    return (
        <Form
            layout={"vertical"}
            form={form}
            initialValues={{title, isVertical, options}}
            onValuesChange={handleValueChange}
            disabled={disabled}
        >
            <Form.Item label={"标题"} name={"title"} rules={[{required: true, message: '请输入标题'}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label={"选项"}>
                <Form.List name={'options'}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'text']}
                                        rules={[{ required: true, message: '请输入选项文字' },
                                            //使用异步的方式进行属性的校验
                                            {
                                                validator:(_,text)=>{
                                                   const {options=[]}=form.getFieldsValue()
                                                    let num=0
                                                    options.forEach((opt:OptionType)=>{
                                                        if(opt.text===text)num++
                                                    })
                                                    if(num===1)return Promise.resolve()
                                                    return Promise.reject(new Error('跟其他选项重复了'))
                                                }
                                            }]}
                                    >
                                        <Input placeholder="输入文字" />
                                    </Form.Item>
                                    <Button type="link" onClick={() => remove(name)} icon={<MinusOutlined />}></Button>
                                </Space>
                            ))}
                            <Button
                                type="link"
                                onClick={() => add({ text: '', value: '' })}
                                icon={<PlusOutlined />}
                                block
                            >
                                添加选项
                            </Button>
                        </>
                    )}
                </Form.List>
            </Form.Item>

            <Form.Item label={"是否垂直"} name={"isVertical"} valuePropName={"checked"}>
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
            <Form.Item label={'默认选中'} name={'value'}>
                <Select
                    value={value}
                    options={options
                        .map(({text, value}) => ({value, label: text || ''}))}
                >
                </Select>
            </Form.Item>
        </Form>
    )

}
export default PropComponent

//homework：完成多选框。