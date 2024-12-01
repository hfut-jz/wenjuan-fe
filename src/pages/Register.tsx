import React,{FC} from 'react'
import {Typography, Space, Form, Input, Button, message} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import styles from './Register.module.scss'
import {useRequest} from "ahooks";
import {LOGIN_PATH} from "../router";
import {registerService} from "../services/user";
import {Link,useNavigate} from "react-router-dom";

const {Title}=Typography

const Register:FC=()=>{
    const nav=useNavigate()
    const {run}=useRequest(async values=>{
        const {username,password,nickname}=values
        await registerService({username,password,nickname})
    },{
        manual:true,
        onSuccess(){
            message.success('注册成功')
            nav({
                pathname:LOGIN_PATH
            })
        }
    })
    const onFinish=(values:any)=>{
        run(values)
    }
    return <div>
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}><UserAddOutlined></UserAddOutlined></Title>
                    <Title level={2}>注册</Title>
                </Space>
            </div>
            <div>
                <Form
                    labelCol={{span:6}}
                    wrapperCol={{span:16}}
                    onFinish={onFinish}
                >
                    <Form.Item label='用户名' name={'username'} rules={[{required:true,message:'请输入用户名'},
                        {type:'string',min:4,max:16,message:'用户名长度在4-16之间'},
                        {pattern:/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,message:'用户名以字母开头，允许4-16个字母、数字、下划线'}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label='密码' name={'password'} rules={[{required:true,message:'请输入密码'}]}>
                        <Input.Password></Input.Password>
                    </Form.Item>
                    <Form.Item label='确认密码' name={'confirm'}
                    rules={[{required:true,message:'请再次输入密码'}]}>
                        <Input.Password></Input.Password>
                    </Form.Item>
                    <Form.Item label='昵称' name={'nickname'}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:6}}>
                        <Space>
                            <Button type={"primary"} htmlType={'submit'} >注册</Button>
                            <Link to={LOGIN_PATH}>已有账户，登陆</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
}
export default Register