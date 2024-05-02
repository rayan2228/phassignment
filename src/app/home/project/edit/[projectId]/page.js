import Title from '@/Components/Title'
import CreateProject from '@/Components/project/CreateProject'
import React from 'react'

const projectEdit = ({ params: { projectId } }) => {

    return (
        <>
            <Title>Edit Project</Title>
            <CreateProject projectId={projectId} />
        </>
    )
}

export default projectEdit