import { createContext, useContext, useEffect, useState } from "react"
import { getMe } from "@/api/authApi.js"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const me = await getMe()
            setUser(me)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)
