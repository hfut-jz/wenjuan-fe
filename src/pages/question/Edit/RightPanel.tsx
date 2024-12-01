import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";

export enum TabKeyType{
    KEY_PROP='prop',
    KEY_SETTING='setting'
}
const RightPanel: React.FC = () => {
    const {KEY_PROP,KEY_SETTING}=TabKeyType
    const [activeKey,setActiveKey]=useState('')
    const {selectedId}=useGetComponentsInfo()
    useEffect(() => {
        if(selectedId)setActiveKey(TabKeyType.KEY_PROP)
        else setActiveKey(TabKeyType.KEY_SETTING)
    }, [selectedId]);
    const tabsItem = [
        {
            key:KEY_PROP,
            label: (
                <span>
                <FileTextOutlined></FileTextOutlined>
                    属性
            </span>
            ),
            children: <ComponentProp></ComponentProp>
        },
        {
            key: KEY_SETTING,
            label: (
                <span>
                <SettingOutlined></SettingOutlined>
                    页面配置
                </span>
            ),
            children: <PageSetting></PageSetting>
        }
    ]
    return (
        <Tabs items={tabsItem} activeKey={activeKey}/>
    )

}
export default RightPanel