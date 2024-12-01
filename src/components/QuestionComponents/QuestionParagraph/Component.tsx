import React from "react";
import { QuestionParagraphPropsType } from "./interface";
import { Typography } from "antd";

const { Paragraph } = Typography;

const Component: React.FC<QuestionParagraphPropsType> = (props) => {
    const { text = "一行段落", isCenter = false } = props;

    // 将文本按行分割
    const textList = text.split("\n");
    //尽量不要使用dangerouslySetInnerHTML，不安全
    return (
        <Paragraph
            style={{
                textAlign: isCenter ? "center" : "start",
                marginBottom: 0,
            }}>
            {textList.map((line, index) => (
                <span key={index}>
          {index > 0 && <br />}
                    {line}
        </span>
            ))}
        </Paragraph>
    );
};

export default Component;
