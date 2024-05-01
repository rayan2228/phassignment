import { User } from "@/app/lib/model/user.schema"

export async function POST(req, res) {
    const data = await req.json()
    const userFound = await User.findOne({ email: data.email, password: data.password }).select("-password")
    if (userFound) {
        return Response.json({ message: "user login successfully", data: userFound })
    } else {
        return Response.json({ error: "wrong email and password" })
    }
}