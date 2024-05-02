"use client"
import React from 'react'
import { Button, Checkbox, Form, Input, notification, Select } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
const { TextArea } = Input;
const options = [];
const CreateProject = ({ projectId }) => {
    const [api, contextHolder] = notification.useNotification();
    const { isPending, error, data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            fetch('/api/user').then((res) =>
                res.json(),
            ),
    })
    const { isPending: projectPending, error: projectError, data: projectInfo } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () =>
            fetch(`/api/project/${projectId}`).then((res) =>
                res.json(),
            ),
    })
    const mutation = useMutation({
        mutationFn: (newProject) => {
            if (projectId) {
                fetch(`/api/project/${projectId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(newProject),
                })
            } else {
                fetch('/api/project', {
                    method: 'POST',
                    body: JSON.stringify(newProject),
                })
            }
        },
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
    if (!isPending) {
        for (let i = 0; i < users.users.length; i++) {
            options.push({
                label: users.users[i].name,
                value: users.users[i]._id,
            });
        }
    }
    if (projectPending) {
        return <div>loading....</div>
    }
    return (
        <>
            {contextHolder}
            <Form className='mt-5' layout="vertical" onFinish={onFinish} initialValues={
                { name: projectInfo.project.name },
                { description: "asas" }
            }
            >
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
                <Form.Item
                    label="Project Members"
                    name="users"
                    rules={[
                        {
                            required: true,
                            message: 'Please select members!',
                        },
                    ]}
                >
                    {
                        !isPending &&
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            options={options}
                        />
                    }
                </Form.Item>
                <Button type="primary" htmlType="submit" className='w-full'>
                    create project
                </Button>

            </Form >
        </>


    )
}

export default CreateProject