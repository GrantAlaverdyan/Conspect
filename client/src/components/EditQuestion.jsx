import React, { useState, useEffect } from 'react';
import { Table, message, Modal, Input } from 'antd';

function EditQuestion() {
    const { TextArea } = Input;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [editObject, setEditObject] = useState({})
    const [editText, setEditText] = useState('')

    useEffect(() => {
        fetch("http://localhost:5000/getallquestions")
            .then(res => res.json())
            .then(res => {
                let arr = res.response
                for (let i = 0; i < arr.length; i++) {
                    arr[i].num = i + 1;

                }
                setData(arr)
            })
    }, [])
    const updatePage = () => {
        window.location.reload()
    }
    const deleteQuestion = async (id) => {
        const reqComparison = await fetch(

            'http://localhost:5000/deletequestion',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ idQuestion: id })
            });
        const resultDelete = await reqComparison.json();
        console.log(resultDelete)
        if (resultDelete.response === 'success') {
            message.success('Удалено успешно')
            // window.location.reload()
            setTimeout(updatePage, 1000)
        }
    }

    const handleOk = async (id) => {
        setIsModalOpen(false);
        console.log(editText, editObject.id)
        const reqComparison = await fetch(

            'http://localhost:5000/editquestion',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ id: editObject.id, text: editText })
            });
        const resultEdit = await reqComparison.json();
        console.log(resultEdit)
        if (resultEdit.response === 'success') {
            message.success('Обновлено успешно')
            // window.location.reload()
            setTimeout(updatePage, 1000)
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const editQuestionModal = (id) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                setEditObject(data[i])
                setIsModalOpen(true);
            }
        }
    }

    const sendEditQuestion = (text) => {
        setEditText(text)
    }
    const columns = [
        {
            title: 'Num',
            dataIndex: 'num',
            key: 'num',
        },

        {
            title: 'Question',
            dataIndex: 'question_name',
            key: 'question_name',
        },
        {
            title: 'Answer',
            dataIndex: 'answer_value',
            key: 'answer_value',
        },
        {
            title: 'Download',
            dataIndex: 'file_name',
            key: 'file_name',
            render: (file_name) => (<a href={`http://localhost:5000/download?fileName=${file_name}`}>{file_name}</a>)
        },
        {
            title: 'Delete',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (<button onClick={() => { deleteQuestion(id) }}>Delete</button>)
        },
        {
            title: 'Edit',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (<button onClick={() => { editQuestionModal(id) }}>Edit</button>)
        }
    ];
    return (
        <>
            <Table dataSource={data} columns={columns} />;
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{editObject.id}</p>
                <p>{editObject.question_name}</p>
                <p>{editObject.answer_value}</p>
                <TextArea rows={4} placeholder="maxLength is 6" maxLength={5000} onChange={(e) => sendEditQuestion(e.target.value)} />
            </Modal>
        </>
    )
}

export default EditQuestion;