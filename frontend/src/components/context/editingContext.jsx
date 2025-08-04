import {createContext, useContext, useState, useEffect} from "react"

const EditingContext = createContext()

export const EditingProvider = ({children}) => {
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("editing")
        if (saved === "true") setEditing(true)
    }, [])

    useEffect(() => {
        localStorage.setItem("editing", editing)
    }, [editing])

    return (
        <EditingContext.Provider value={{editing, setEditing}}>
            {children}
        </EditingContext.Provider>
    )
}

export const useEditing = () => useContext(EditingContext)
