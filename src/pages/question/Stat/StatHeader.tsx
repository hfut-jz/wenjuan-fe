import React, { useRef } from 'react';
import styles from './StatHeader.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { Button, Input, InputRef, message, Popover, QRCode, Space, Tooltip, Typography } from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const StatHeader = () => {
    const nav = useNavigate();
    const { title, isPublish } = useGetPageInfo();
    const { id } = useParams();
    const urlInputRef = useRef<InputRef>(null);

    const copy = () => {
        const elem = urlInputRef.current?.input;
        if (!elem) return;
        elem.select();
        document.execCommand('copy');
        message.success('拷贝成功');
    };

    const getLinkAndQRCodeElem = () => {
        if (!isPublish) return null;

        const url = `http://localhost:3000/question/${id}`;
        const QRCodeElem = (
            <div style={{ textAlign: 'center' }}>
                <QRCode value={url} size={150} />
            </div>
        );

        return (
            <Space>
                <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
                <Tooltip title="拷贝链接">
                    <Button icon={<CopyOutlined />} onClick={copy} />
                </Tooltip>
                <Popover content={QRCodeElem}>
                    <Button icon={<QrcodeOutlined />} />
                </Popover>
            </Space>
        );
    };

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
                        返回
                    </Button>
                    <Title level={4}>{title}</Title>
                </div>
                <div className={styles.main}>{getLinkAndQRCodeElem()}</div>
                <div className={styles.right}>
                    <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
                        编辑问卷
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StatHeader;
