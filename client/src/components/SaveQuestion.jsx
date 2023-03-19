import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';


const { Dragger } = Upload;



function SaveQuestions() {

    const [sendFile, useSendFile] = useState({})
    const [fileANTD, setFileANTD] = useState(null)

    const updatePage = () => {
        window.location.reload()
    }
    const onChange = (e) => {
        // console.log(e.file, e.fileList);
        // console.log({ file: e });
        setFileANTD(e.file)
        console.log(e.file)
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        const url = 'http://localhost:5000/savequestion';
        const formData = new FormData();
        // file.name = 'filedata'
        console.log('file check', fileANTD);
        formData.append('avatar', fileANTD)
        formData.append('some', JSON.stringify(values))
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        axios.post(url, formData, config)
            .then((response) => {
                console.log(response);
            })
        // const reqComparison = await fetch(

        //     'http://localhost:5000/savequestion',
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         method: 'POST',
        //         body: JSON.stringify(values)
        //     });
        // const arrSortUserId = await reqComparison.json();
        // if (arrSortUserId.response === "success") {
        //     message.success("Сохранено успешно")
        //     setTimeout(updatePage, 1000)
        // }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const send = async () => {
        // fetch("http://localhost:5000/savequestion")
        //     .then(res => res.json())
        //     .then(res => console.log(res))
        const reqComparison = await fetch(

            'http://localhost:5000/savequestion',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({})
            });
        const arrSortUserId = await reqComparison.json();
        console.log(arrSortUserId)

    }
    // const props = {
    //     name: 'file',
    //     multiple: true,
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     onChange(info) {
    //         const { status } = info.file;
    //         if (status !== 'uploading') {
    //             // console.log(info.file, info.fileList);
    //             console.log("info.fileList.originFileObj", info.fileList[0].originFileObj)
    //             useSendFile(info.fileList[0].originFileObj)
    //         }
    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //         }
    //     },
    // onDrop(e) {
    //     console.log('Dropped files', e.dataTransfer.files);
    // },
    // };
    return (
        <>
            <button onClick={() => send()}>Запрос на backend</button>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    margin: "0 auto",
                    padding: "15px",
                    border: "1px solid lightblue",
                    borderRadius: "10px",
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Название вопроса"
                    name="questionName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your question!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ответ"
                    name="answerValue"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your answer!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                </Form.Item>
                <Dragger onChange={(e) => onChange(e)} beforeUpload={() => { return false }} maxCount={1}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
                <Button type="primary" htmlType="submit">
                    Сохранить вопрос
                </Button>
            </Form>


        </>
    )
}

export default SaveQuestions;