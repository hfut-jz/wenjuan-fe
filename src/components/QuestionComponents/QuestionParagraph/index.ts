//组件配置

import Component from "./Component";
import PropComponent from "./PropComponent";
import {QuestionParagraphDefaultProps} from "./interface";
export * from './interface'

//注意，其是根据type进行匹配的，所以type一定要写对
export default {
    title:'输入段落',
    type:'questionParagraph',
    Component,
    PropComponent,
    defaultProps:QuestionParagraphDefaultProps
}