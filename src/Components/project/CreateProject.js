"use client"
import React from 'react'
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
const { TextArea } = Input;



const CreateProject = () => {

    const [api, contextHolder] = notification.useNotification();
    const mutation = useMutation({
        mutationFn: (newProject) => fetch('/api/project', {
            method: 'POST',
            body: JSON.stringify(newProject),
        }),
        onSuccess: async (res) => {
            const data = await res.json()
            if (data.message) {
                openNotification("success", data.message)
            } else {
                openNotification("error", data.error)
            }
        },

    })
    const openNotification = (type, message) => {
        api[type]({
            message
        });
    };
    const onFinish = (values) => {
        mutation.mutate(values)
    };
    return (
        <>
            {contextHolder}
            <Form className='mt-5' layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Project Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your project name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Project Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your project description!',
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Button type="primary" htmlType="submit" className='w-full'>
                    create project
                </Button>

            </Form>
        </>


    )
}

export default CreateProject