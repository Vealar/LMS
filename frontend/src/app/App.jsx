import {Routes, Route, Navigate} from "react-router-dom"
import CoursePage from "@/pages/coursePage.jsx"
import CourseMainPage from "@/pages/courseMainPage.jsx"
import AuthPage from "@/pages/AuthPage.jsx"
import {useAuth} from "@/components/context/authContext.jsx"
import CourseTopicEditorPage from "@/pages/courseTopicEditorPage.jsx";

function PrivateRoute({children}) {
    const {user, loading} = useAuth()

    if (loading) return <div className="text-center mt-10">Загрузка...</div>
    return user ? children : <Navigate to="/login"/>
}

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<AuthPage mode="login"/>}/>
            <Route path="/register" element={<AuthPage mode="register"/>}/>

            <Route
                path="/courses/:courseId"
                element={
                    <PrivateRoute>
                        <CoursePage/>
                    </PrivateRoute>
                }
            >
                <Route
                    path="topics/:topicId/blocks/:blockId"
                    element={<CourseMainPage/>}
                />
                <Route
                    path="topics/:topicId/edit"
                    element={<CourseTopicEditorPage/>}
                />
            </Route>

            <Route path="*" element={<Navigate to="/courses/1"/>}/>
        </Routes>
    )
}
