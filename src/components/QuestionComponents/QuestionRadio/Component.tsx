import React, {FC} from 'react'
import {Typography, Radio, Space} from "antd";
import {QuestionRadioPropsType, QuestionRadioDefaultProps} from "./interface";
import {isClass} from "eslint-plugin-react/lib/util/ast";

const {Paragraph} = Typography
const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const {title,
        options=[],
        isVertical,
        value} = {...QuestionRadioDefaultProps, ...props}
    return (
        <div>
            <Paragraph strong>
                {title}
            </Paragraph>
            <Radio.Group>
            <Space direction={isVertical?'vertical':'horizontal'}>
                {options.map(opt=>{
                    const {value,text}=opt
                    return <Radio key={value} value={value}>{text}</Radio>
                })}
            </Space>
        </Radio.Group>
        </div>
    )

}
export default Component