import React from "react";
import {componentConfGroup, ComponentConfType} from "../../../components/QuestionComponents";
import {Typography} from "antd";
import styles from './ComponentLib.module.scss'
import {useDispatch} from "react-redux";
import {addComponents} from "../../../store/componentsReducer";
import {nanoid} from "@reduxjs/toolkit";

const {Title} = Typography


const ComponentLib: React.FC = () => {
    const dispatch = useDispatch();

    function genConf(c: ComponentConfType) {
        const { title, type, Component, defaultProps } = c;

        const handleClick = () => {
            dispatch(
                addComponents({
                    fe_id: nanoid(),
                    title,
                    type,
                    props: defaultProps,
                })
            );
        };

        return (
            <div className={styles.wrapper} onClick={handleClick}>
                <div className={styles.component}>
                    <Component></Component>
                </div>
            </div>
        );
    }

    return (
        <>
            {componentConfGroup.map((group, index) => {
                const { groupName, components, groupId } = group;
                return (
                    <div key={groupId}>
                        <Title
                            level={3}
                            style={{ fontSize: "16px", marginTop: index > -1 ? "20px" : "0" }}
                        >
                            {groupName}
                        </Title>
                        <div>
                            {components.map((c, i) => {
                                return (
                                    <div key={`${c.type}-${i}`}>
                                        {genConf(c)}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ComponentLib;
