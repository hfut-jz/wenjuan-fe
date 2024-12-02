/*
* @description 组件配置文件
* */
import Component from "./Component";
import {QuestionRadioDefaultProps} from "./interface";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from "./interface"

export default {
    title:'单选',
    type:'questionRadio',
    Component,
    PropComponent,
    StatComponent,
    defaultProps:QuestionRadioDefaultProps
    //统计组件

}