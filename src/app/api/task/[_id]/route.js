import { Task } from "@/lib/model/task.model"

export async function PATCH(request, { params: { _id } }) {
    const data = await request.json()
    const updatedTask = await Task.findByIdAndUpdate(_id, data, {
        new: true
    })
    return Response.json({ message: "Task updated successfully", data: updatedTask })
}

export async function DELETE(_request, { params: { _id } }) {
    await Task.findByIdAndDelete(_id)
    return Response.json({ message: "task deleted successfully" })
}