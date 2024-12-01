//规定类型
export type QuestionParagraphPropsType={
    text?:string
    isCenter?:boolean
    //用于Prop,
    onChange?:(newProps:QuestionParagraphPropsType)=>void,
    disabled?:boolean
}
//默认属性
export const QuestionParagraphDefaultProps:QuestionParagraphPropsType={
    text:'一行段落',
    isCenter:false
}