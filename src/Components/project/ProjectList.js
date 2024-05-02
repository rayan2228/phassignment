"use client"
import React from 'react'
import { Space, Table, Button, notification } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Content } from 'next/font/google';
import moment from 'moment';
import Link from 'next/link';

const ProjectList = () => {
    const queryClient = useQueryClient();
    const { isPending, error, data } = useQuery({
        queryKey: ['projects'],
        queryFn: () =>
            fetch('/api/project').then((res) =>
                res.json(),
            ),
    })
    const [api, contextHolder] = notification.useNotification();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" >
                        <Link type="primary" href={`/home/project/${record._id}`} >
                            View
                        </Link>
                    </Button>
                    <Button type="primary" className='bg-yellow-600'>
                        <Link type="primary" href={`/home/project/edit/${record._id}`} >
                            Edit
                        </Link>
                    </Button>
                    <Button type="primary" danger onClick={() => handleDelete(record._id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    const mutation = useMutation({
        mutationFn: (_id) => fetch(`/api/project/${_id}`, {
            method: 'DELETE'
        }),
        onSuccess: async (res) => {
            queryClient.invalidateQueries(["projects"])
            const data = await res.json()
            openNotification("success", data.message)
        },

    })
    const openNotification = (type, message) => {
        api[type]({
            message
        });
    };
    function handleDelete(id) {
        mutation.mutate(id)
    }
    let content

    if (isPending) {
        return <div>loading....</div>

    }
    if (data) {
        content = <Table columns={columns} dataSource={data.projects} />
    }
    return (
        <>
            {contextHolder}
            {content}
        </>
    )
}

export default ProjectList