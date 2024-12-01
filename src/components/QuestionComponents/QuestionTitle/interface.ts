//首先定义类型，然后使用const props进行具体信息传入
export type QuestionTitlePropsType = {
    text?:string
    level?:1|2|3|4|5
    isCenter?:boolean

    onChange?:(newProps:QuestionTitlePropsType)=>void
    disabled?:boolean
}
export const QuestionTitleDefaultProps:QuestionTitlePropsType = {
    text:'一行标题',
    level:1,
    isCenter:false
}