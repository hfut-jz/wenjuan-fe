/*
* @description 问卷
* */

import Component from "./Component";
import {QuestionTitleDefaultProps} from "./interface";
import PropComponent from "./PropComponent";
export * from "./interface";

export default {
    title: "问卷",
    type: "questionTitle",
    Component,
    PropComponent,
    defaultProps:QuestionTitleDefaultProps
}