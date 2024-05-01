"use client"
import React from 'react';
import { Col, Row } from 'antd';
import SideBar from '@/Components/SideBar';
import useAuthStore from "@/zustand/authStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
const layout = ({ children }) => {
    const { state: { authUser } } = JSON.parse(localStorage.getItem("authUserInfo"))
    const router = useRouter()
    return (
        <>
            {
                Object.keys(authUser).length ?
                    <Row>
                        <Col span={18} push={4}>
                            {children}
                        </Col>
                        <Col span={3.5} pull={18}>
                            <SideBar />
                        </Col>
                    </Row >
                    :
                    router.push("/auth/login")
            }
        </>
    )
}

export default layout