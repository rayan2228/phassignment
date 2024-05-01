"use client"
import { Menu, Avatar, Button } from 'antd';
import { ProjectOutlined } from '@ant-design/icons';
import useAuthStore from '@/zustand/authStore';
import { useRouter } from 'next/navigation';
const items = [
    {
        key: 'sub1',
        label: 'Projects',
        icon: <ProjectOutlined />,
        children: [
            {
                key: 'project-list',
                label: 'project lists',
            },
            {
                key: 'create-project',
                label: 'create project',
            },
        ],
    }
]
const SideBar = () => {
    const router = useRouter()
    const { authUser, logoutUser } = useAuthStore((state) => (
        {
            authUser: state.authUser,
            logoutUser: state.logoutUser,
        }
    ))

    const handleLOgout = () => {
        logoutUser()
        router.push("/auth/login")
    }
    const handleRouteChange = (e) => {
        router.push(`/home/project/${e.key}`)
    }
    return (
        <>
            <div className='py-2 text-center capitalize bg-gray-300'>project management dashboard</div>
            <Menu
                onClick={handleRouteChange}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />

            <div className='p-2 capitalize bg-gray-300 '>
                <div className='flex items-center gap-x-3'>
                    <Avatar
                        style={{
                            backgroundColor: "black",
                            verticalAlign: 'middle',
                        }}
                        size="large"
                        gap={50}
                    >
                        {authUser?.name?.[0]}
                    </Avatar>
                    <div>
                        <h4>{authUser?.name}</h4>
                        <p>{authUser?.email}</p>
                    </div>
                </div>
                <Button
                    size="large"
                    style={{
                        verticalAlign: 'middle',
                        background: "red",
                        color: "white",
                        marginTop: 15
                    }}
                    onClick={handleLOgout}
                >
                    logout
                </Button>
            </div>
        </>

    )
}

export default SideBar