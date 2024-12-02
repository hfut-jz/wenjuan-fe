import React, { FC } from "react";
import classNames from "classnames";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";

import { getComponentConfByType } from "../../../components/QuestionComponents";
import styles from "./ComponentList.module.scss";

type PropsType = {
    selectedComponentId: string;
    setSelectedComponentId: (id: string) => void;
    setSelectedComponentType: (type: string) => void;
};
const LeftPanel: FC<PropsType> = (props) => {
    const {setSelectedComponentId,selectedComponentId,setSelectedComponentType}=props
    const { componentList = [], selectedId } = useGetComponentsInfo();

    // 渲染每个组件
    function genComponent(c: any) {
        const { fe_id, props, type, isHidden } = c;

        // 跳过隐藏组件
        if (isHidden) return null;

        // 获取组件配置信息
        const componentConf = getComponentConfByType(type);
        if (!componentConf) return null;
        const { Component } = componentConf;

        // 选中样式
        const wrapperClassName = classNames(styles.componentWrapper, {
            [styles.selected]: fe_id === selectedComponentId,
        });

        return (
            <div
                key={fe_id}
                className={wrapperClassName}
                onClick={() => {
                    setSelectedComponentId(fe_id)
                    setSelectedComponentType(type)
                }}
            >
                <div className={styles.component}>
                    <Component {...props} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {componentList.map((c) => genComponent(c))}
        </div>
    );
};

export default LeftPanel;
