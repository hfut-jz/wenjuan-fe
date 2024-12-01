import React, { FC } from "react";
import classNames from "classnames";
import useGetComponentsInfo from "../../../hooks/useGetComponentsInfo";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import styles from "./ComponentList.module.scss";

const LeftPanel: FC = () => {
    const { componentList = [], selectedId } = useGetComponentsInfo();
    const dispatch = useDispatch();

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
            [styles.selected]: fe_id === selectedId,
        });

        return (
            <div
                key={fe_id}
                className={wrapperClassName}
                onClick={() => dispatch(changeSelectedId(fe_id))}
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
