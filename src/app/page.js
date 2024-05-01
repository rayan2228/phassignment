"use client"
import useAuthStore from "@/zustand/authStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const authUser = useAuthStore((state) => state.authUser)
  const router = useRouter()
  return (
    <>
      {
        Object.keys(authUser).length ?
          router.push("/home")
          :
          router.push("/auth/login")
      }
    </>
  );
}
