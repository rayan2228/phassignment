import { User } from "@/lib/model/user.schema"

export async function GET() {
    const users = await User.find().select("-password")
    return Response.json({ users })
}
export async function POST(req, res) {
    const data = await req.json()
    const userFound = await User.findOne({ email: data.email })
    if (userFound) {
        return Response.json({ error: "email already used" })
    } else {
        const user = await User.create(data)
        return Response.json({ message: "user created successfully", data: user })
    }
}