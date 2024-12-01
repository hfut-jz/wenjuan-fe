import React, {FC, useEffect, useState} from 'react'
import {Pagination} from "antd";
import {LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY} from "../constant";
import {useSearchParams,useLocation,useNavigate} from "react-router-dom";

type PropsType={
    total:number
}
//泛型写在前面，其是个组件进行组件抽离开发
const ListPage: FC<PropsType>=(props:PropsType)=>{
    const {total}=props
    const [pageSize,setPageSize]=useState(LIST_PAGE_SIZE)
    const [current,setCurrent]=useState(1)
    const [searchParams]=useSearchParams()
    const nav=useNavigate()
    const {pathname}=useLocation()

    //只要searchParams变化，就执行下面的代码
    useEffect(() => {
        const page=parseInt(searchParams.get(LIST_PAGE_PARAM_KEY)||'1')
        setCurrent(page)
        const pageSize=parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)||'100')
        setPageSize(pageSize)
    }, [searchParams]);
    //当前页码或每页显示数量变化时，执行下面的代码
    function handlePageChange(page:number,pageSize:number){
        searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString())
        nav({
            pathname,
            search:searchParams.toString()
        })
    }
    return <Pagination total={total} current={current} pageSize={pageSize} onChange={handlePageChange}></Pagination>
}
export default ListPage