import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Input} from "antd";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {LIST_SEARCH_PARAM_KEY} from "../constant";

const ListSearch:FC = () => {
    const nav=useNavigate()
    const {pathname}=useLocation()

    const {Search}= Input
    const [value,setValue]=useState('')

    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setValue(event.target.value)
    }
    const handleSearch=()=>{
        //通过路由进行导航
        nav({
            pathname:pathname,
            search:`${LIST_SEARCH_PARAM_KEY}=${value}`
        })
    }
    //获取url参数，并设置到input value 中
    const [searchParams]=useSearchParams()
    useEffect(() => {
        const newVal=searchParams.get(LIST_SEARCH_PARAM_KEY)
        setValue(newVal||'')
    }, [searchParams]);
    return <p><Search placeholder='输入关键字' value={value} onChange={handleChange} onSearch={handleSearch}></Search></p>
}
export default ListSearch