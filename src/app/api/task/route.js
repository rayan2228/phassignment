import { Task } from "@/app/lib/model/task.model"


export async function GET() {
    const tasks = await Task.find()
    return Response.json({ tasks })
}
export async function POST(req, res) {
    const data = await req.json()
    const task = await Task.create(data)
    return Response.json({ message: "task created successfully", data: task })
}
