import { Project } from "@/lib/model/project.model";


export async function PATCH(request, { params: { _id } }) {
    const data = await request.json()
    const updatedProject = await Project.findByIdAndUpdate(_id, data, {
        new: true
    })
    return Response.json({ message: "project updated successfully", data: updatedProject })
}

export async function DELETE(_request, { params: { _id } }) {
    await Project.findByIdAndDelete(_id)
    return Response.json({ message: "project deleted successfully" })
}