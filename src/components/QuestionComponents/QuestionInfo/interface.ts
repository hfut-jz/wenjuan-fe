//组件的基本属性

export type QuestionInfoType={
    title?:string
    desc?:string
    //Props
    onChange?:(newProps:QuestionInfoType)=>void
    disabled?:boolean
}
export const QuestionInfoDefaultProps:QuestionInfoType={
    title:'标题+描述',
    desc: '问卷描述',
}
