import { create } from 'zustand'

import { persist, devtools } from "zustand/middleware"


const authStore = (set) => ({
    authUser: {},
    loginUser: (userData) => set((state) => (state.authUser = userData)),
    logoutUser: () => set((state) => (state.authUser = [])),
})

const useAuthStore = create(
    devtools(
        persist(authStore, {
            name: "authUserInfo"
        })
    )
)


export default useAuthStore
