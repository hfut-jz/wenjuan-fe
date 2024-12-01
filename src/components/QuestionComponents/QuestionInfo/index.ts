import Component from './Component'
import { QuestionInfoDefaultProps } from './interface'
import PropComponent from "./PropComponent";
export * from './interface'

export default {
    title:"标题+描述",
    type:"questionInfo",
    Component,
    PropComponent,
    defaultProps: QuestionInfoDefaultProps
}