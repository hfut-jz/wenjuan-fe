import React from "react";
import {Tabs} from 'antd'
import {AppstoreOutlined,BarsOutlined} from "@ant-design/icons";
import ComponentLib from "./ComponentLib";
import Layers from "./Layers";

const LeftPanel:React.FC=()=>{
    const tabsItem=[
        {
            key:'componentLib',
            label:(
                <span>
                    <AppstoreOutlined/>
                    组件库
                </span>
            ),
            children:<ComponentLib></ComponentLib>
        },
        {
            key: 'layers',
            label:(
                <span>
                    <BarsOutlined></BarsOutlined>
                    图层
                </span>
            ),
            children:<Layers></Layers>
        }
    ]
    return(
        < Tabs items={tabsItem} defaultActiveKey="componentLib"/>
    )
}
export default LeftPanel