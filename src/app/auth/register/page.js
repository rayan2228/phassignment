"use client"
import React from 'react'
import { Button, Checkbox, Form, Input, message, notification } from 'antd'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const register = () => {
    const router = useRouter()
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, message) => {
        api[type]({
            message
        });
    };

    const onFinish = async (values) => {
        const res = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        const data = await res.json()
        if (data.message) {
            openNotification('success', data.message)
            router.push("/auth/login")
        } else {
            openNotification('error', data.error)
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            {contextHolder}
            <div>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 1000,
                        color: 'white'
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            register
                        </Button>
                    </Form.Item>
                </Form>
                <p>already have an account? please <Link href={"/auth/login"} className='text-red-500'>login</Link> </p>
            </div>
        </div >
    )
}

export default register