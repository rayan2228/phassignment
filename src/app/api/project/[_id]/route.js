import { Project } from "@/lib/model/project.model";
import { Task } from "@/lib/model/task.model";

export async function GET(request, { params: { _id } }) {
    const project = await Project.findById(_id)
    return Response.json({ project })
}
export async function PATCH(request, { params: { _id } }) {
    const data = await request.json()
    const updatedProject = await Project.findByIdAndUpdate(_id, data, {
        new: true
    })
    return Response.json({ message: "project updated successfully", data: updatedProject })
}

export async function DELETE(_request, { params: { _id } }) {

    await Task.deleteMany({ project: _id })
    await Project.findByIdAndDelete(_id)
    return Response.json({ message: "project deleted successfully" })
}