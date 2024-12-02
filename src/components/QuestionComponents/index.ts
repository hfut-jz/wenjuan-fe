import QuestionTitleConf, {QuestionTitlePropsType} from "./QuestionTitle";
import QuestionInputConf, {QuestionInputPropsType} from "./QuestionInput";
import QuestionParagraphConf, {QuestionParagraphPropsType} from "./QuestionParagraph";
import QuestionInfoConf, {QuestionInfoType} from "./QuestionInfo";
import QuestionTextareaConf, {QuestionTextareaPropsType} from "./QuestionTextarea";
import QuestionRadioConf, {QuestionRadioPropsType, QuestionRadioStatPropsType} from "./QuestionRadio";
import QuestionCheckboxConf, {QuestionCheckboxPropsType, QuestionCheckboxStatPropsType} from "./QuestionCheckbox";
import React from "react";

//必须这样写规定其的类型，然后在store中进行储存并且进行展示
export type ComponentPropsType =
    QuestionInputPropsType
    & QuestionTitlePropsType
    & QuestionParagraphPropsType
    & QuestionInfoType
    & QuestionTextareaPropsType
    & QuestionRadioPropsType
    & QuestionCheckboxPropsType;

// 组件配置类型
export type ComponentConfType = {
    title: string;
    type: string;
    Component: React.FC<ComponentPropsType>;
    PropComponent: React.FC<ComponentPropsType>;
    defaultProps: ComponentPropsType;
    StatComponent?:React.FC<ComponentStatType>
}
//组件统计类型
export type ComponentStatType=QuestionRadioStatPropsType&QuestionCheckboxStatPropsType


const componentConfList: ComponentConfType[] = [QuestionInputConf,
    QuestionTitleConf,
    QuestionParagraphConf,
    QuestionInfoConf,
    QuestionTextareaConf,
    QuestionRadioConf,
    QuestionCheckboxConf]

//很重要的一步：在这里进行组件分组
export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf]
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf, QuestionTextareaConf]
    },
    {
        groupId: 'chooseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf, QuestionCheckboxConf]
    }
]


//根据type寻找到组件
export function getComponentConfByType(type: string) {
    return componentConfList.find(c => c.type === type)
}