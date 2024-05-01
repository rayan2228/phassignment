import { Project } from "@/app/lib/model/project.model"

export async function GET() {
    const projects = await Project.find()
    return Response.json({ projects })
}
export async function POST(req, res) {
    const data = await req.json()
    const projectFound = await Project.findOne({ name: data.name })
    if (projectFound) {
        return Response.json({ message: "project name must be unique" })
    } else {
        const project = await Project.create(data)
        return Response.json({ message: "project created successfully", data: project })
    }
}

