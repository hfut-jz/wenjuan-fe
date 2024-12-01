import React, {FC, useEffect} from 'react'
import {useNavigate,Link} from "react-router-dom";
import styles from './Login.module.scss'
import {Button, Form, Input, Space, Typography, Checkbox, message} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import {MANAGE_LIST_PATH, REGISTER_PATH} from "../router";
import {useForm} from "antd/es/form/Form";
import {loginService} from "../services/user";
import {useRequest} from "ahooks";
import {setToken} from "../utils/user-token";

const Login:FC=()=>{
    const {Title}=Typography
    const nav=useNavigate()
    const USERNAME_KEY='USERNAME'
    const PASSWORD_KEY='PASSWORD'
    function rememberUser(username:string,password:string){
        localStorage.setItem(USERNAME_KEY,username)
        localStorage.setItem(PASSWORD_KEY,password)
    }
    const deleteUser=()=>{
        localStorage.removeItem(USERNAME_KEY)
        localStorage.removeItem(PASSWORD_KEY)
    }
    const getUser=()=>{return {
        username: localStorage.getItem(USERNAME_KEY),
        password:localStorage.getItem(PASSWORD_KEY)
    }}
    const [form]=useForm()
    useEffect(() => {
        const {username,password}=getUser()
        form.setFieldsValue({username,password})
    }, []);
    const {run}=useRequest(async values=>{
        const {username,password}=values
       const data= await loginService({username,password})
        return data
    },
        {
            manual:true,
            onSuccess(result){
                const {token=''}=result
                setToken(token)
                message.success('登录成功')
                nav(MANAGE_LIST_PATH)
        }
    })
    const onFinish=(values:any)=>{
        //以后多多使用这种函数解构赋值的方式，然后才能看懂。

        const {username,password,remember}=values || {}
        run(values)
        if(remember){
            rememberUser(username,password)
        }else{
            deleteUser()
        }
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
                    initialValues={{remember:true}}
                    labelCol={{span:6}}
                    wrapperCol={{span:16}}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item label='用户名' name={'username'} rules={[{required:true,message:'请输入用户名'},
                        {type:'string',min:4,max:16,message:'用户名长度在4-16之间'},
                        {pattern:/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,message:'用户名以字母开头，允许4-16个字母、数字、下划线'}]}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label='密码' name={'password'} rules={[{required:true,message:'请输入密码'}]}>
                        <Input.Password></Input.Password>

                    </Form.Item>
                    <Form.Item name={['remember']} valuePropName={"checked"} wrapperCol={{offset:6}}>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:6}}>
                        <Space>
                            <Button type={"primary"} htmlType={'submit'} >登录</Button>
                            <Link to={REGISTER_PATH}>未有账号，注册</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
}
export default  Login