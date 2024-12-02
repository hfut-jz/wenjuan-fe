//组件内容
export type OptionType={
    value:string
    text:string
}
//组件属性
export type QuestionRadioPropsType={
    title?:string
    isVertical?:boolean
    options?:OptionType[]
    value?:string

    //Prop
    onChange?: (newProps: QuestionRadioPropsType) => void
    disabled?:boolean
}
//组件统计
export type QuestionRadioStatPropsType={
    stat: Array<{ name: string; count: number }>
}

export const QuestionRadioDefaultProps:QuestionRadioPropsType={
    title:'单选标题',
    isVertical:false,
    options:[
        {value:'item1',text:'选项1'},
        {value:'item2',text:'选项2'},
        {value:'item3',text:'选项3'},
    ],
    value:''
}
//统计组件的数据类型
